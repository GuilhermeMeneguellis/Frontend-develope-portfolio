'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema } from '@/lib/validations/auth';
import { fadeIn } from '@/lib/motion';

type FieldErrors = Partial<Record<keyof typeof initialState, string>>;

const initialState = {
	name: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: '',
};

export default function RegisterPage() {
	const router = useRouter();
	const { data: session } = useSession();

	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [submitting, setSubmitting] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const [success, setSuccess] = useState<unknown | null>(null);

	// Pré-preenche nome/e-mail quando o usuário veio de login com Google.
	useEffect(() => {
		if (session?.user) {
			setForm((prev) => ({
				...prev,
				name: prev.name || session.user.name || '',
				email: prev.email || session.user.email || '',
			}));
		}
	}, [session]);

	const update = (field: keyof typeof initialState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			if (errors[field]) {
				setErrors((prev) => ({ ...prev, [field]: undefined }));
			}
		};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setApiError(null);
		setErrors({});

		const parsed = registerSchema.safeParse(form);
		if (!parsed.success) {
			const fieldErrors = parsed.error.flatten().fieldErrors;
			setErrors(
				Object.fromEntries(
					Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] ?? '']),
				) as FieldErrors,
			);
			return;
		}

		setSubmitting(true);
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			});

			const data = await res.json();

			if (!res.ok) {
				if (res.status === 409) {
					setApiError('Já existe uma conta com este e-mail.');
				} else if (data?.issues) {
					const mapped: FieldErrors = {};
					for (const [k, v] of Object.entries(data.issues)) {
						if (Array.isArray(v) && v.length > 0) {
							mapped[k as keyof FieldErrors] = String(v[0]);
						}
					}
					setErrors(mapped);
				} else {
					setApiError(data?.error ?? 'Erro ao criar conta.');
				}
				setSubmitting(false);
				return;
			}

			// Exibe o JSON gerado (requisito do exercício).
			setSuccess(data.user);
			console.log('Cadastro concluído — JSON do usuário:', data.user);

			// Auto-login e redireciona para home.
			const loginRes = await signIn('credentials', {
				email: parsed.data.email,
				password: parsed.data.password,
				redirect: false,
			});

			if (loginRes?.ok) {
				setTimeout(() => {
					router.replace('/');
					router.refresh();
				}, 1500);
			} else {
				setSubmitting(false);
			}
		} catch (err) {
			console.error(err);
			setApiError('Erro de rede. Verifique sua conexão e tente novamente.');
			setSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
			<motion.div
				variants={fadeIn('up', 0.1)}
				initial="hidden"
				animate="show"
				className="w-full max-w-lg"
			>
				<Card className="card-gradient">
					<CardContent className="p-8">
						<div className="mb-6 text-center">
							<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<UserPlus className="h-6 w-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold">Criar cadastro</h1>
							<p className="mt-1 text-sm text-muted-foreground">
								{session?.user
									? 'Complete seus dados para finalizar o cadastro'
									: 'Preencha os dados abaixo para criar sua conta'}
							</p>
						</div>

						{apiError ? (
							<div
								role="alert"
								className="mb-4 flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
							>
								<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{apiError}</span>
							</div>
						) : null}

						{success ? (
							<div
								role="status"
								className="mb-4 rounded-md border border-green-500/40 bg-green-500/10 p-4 text-sm"
							>
								<div className="mb-2 flex items-center gap-2 font-medium text-green-500">
									<CheckCircle2 className="h-4 w-4" />
									Cadastro criado com sucesso!
								</div>
								<pre className="mt-2 max-h-60 overflow-auto rounded bg-background/60 p-3 text-xs text-foreground">
									{JSON.stringify(success, null, 2)}
								</pre>
								<p className="mt-2 text-xs text-muted-foreground">
									Redirecionando...
								</p>
							</div>
						) : null}

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Nome completo *</Label>
								<Input
									id="name"
									type="text"
									autoComplete="name"
									value={form.name}
									onChange={update('name')}
									disabled={submitting}
									required
								/>
								{errors.name ? (
									<p className="text-xs text-destructive">{errors.name}</p>
								) : null}
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">E-mail *</Label>
								<Input
									id="email"
									type="email"
									autoComplete="email"
									value={form.email}
									onChange={update('email')}
									disabled={submitting}
									required
								/>
								{errors.email ? (
									<p className="text-xs text-destructive">{errors.email}</p>
								) : null}
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone">Telefone (opcional)</Label>
								<Input
									id="phone"
									type="tel"
									autoComplete="tel"
									placeholder="(00) 00000-0000"
									value={form.phone}
									onChange={update('phone')}
									disabled={submitting}
								/>
								{errors.phone ? (
									<p className="text-xs text-destructive">{errors.phone}</p>
								) : null}
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Senha *</Label>
								<Input
									id="password"
									type="password"
									autoComplete="new-password"
									value={form.password}
									onChange={update('password')}
									disabled={submitting}
									required
								/>
								{errors.password ? (
									<p className="text-xs text-destructive">{errors.password}</p>
								) : (
									<p className="text-xs text-muted-foreground">
										Mínimo 8 caracteres com maiúscula, minúscula e número.
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirmar senha *</Label>
								<Input
									id="confirmPassword"
									type="password"
									autoComplete="new-password"
									value={form.confirmPassword}
									onChange={update('confirmPassword')}
									disabled={submitting}
									required
								/>
								{errors.confirmPassword ? (
									<p className="text-xs text-destructive">
										{errors.confirmPassword}
									</p>
								) : null}
							</div>

							<Button type="submit" className="w-full" disabled={submitting}>
								{submitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Criando conta...
									</>
								) : (
									'Criar conta'
								)}
							</Button>
						</form>

						<p className="mt-6 text-center text-sm text-muted-foreground">
							Já tem uma conta?{' '}
							<Link
								href="/login"
								className="font-medium text-primary hover:underline"
							>
								Entrar
							</Link>
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
