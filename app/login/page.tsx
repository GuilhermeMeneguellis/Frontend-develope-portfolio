'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleButton } from '@/components/auth/google-button';
import { fadeIn } from '@/lib/motion';

const errorMessages: Record<string, string> = {
	CredentialsSignin: 'E-mail ou senha inválidos.',
	OAuthAccountNotLinked: 'Este e-mail já está vinculado a outra forma de login.',
	AccessDenied: 'Acesso negado. Tente novamente.',
	Default: 'Não foi possível concluir o login. Tente novamente.',
};

function LoginContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { status } = useSession();

	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const urlError = searchParams.get('error');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState<string | null>(
		urlError ? errorMessages[urlError] ?? errorMessages.Default : null,
	);

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace(callbackUrl);
		}
	}, [status, router, callbackUrl]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError(null);
		setSubmitting(true);

		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		setSubmitting(false);

		if (!res) {
			setFormError(errorMessages.Default);
			return;
		}
		if (res.error) {
			setFormError(errorMessages[res.error] ?? errorMessages.Default);
			return;
		}
		router.replace(callbackUrl);
		router.refresh();
	};

	return (
		<div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
			<motion.div
				variants={fadeIn('up', 0.1)}
				initial="hidden"
				animate="show"
				className="w-full max-w-md"
			>
				<Card className="card-gradient">
					<CardContent className="p-8">
						<div className="mb-6 text-center">
							<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<LogIn className="h-6 w-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold">Entrar</h1>
							<p className="mt-1 text-sm text-muted-foreground">
								Acesse sua conta para continuar
							</p>
						</div>

						{formError ? (
							<div
								role="alert"
								className="mb-4 flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
							>
								<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{formError}</span>
							</div>
						) : null}

						<div className="space-y-4">
							<GoogleButton callbackUrl={callbackUrl} />

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t border-border" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-card px-2 text-muted-foreground">
										ou com e-mail
									</span>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">E-mail</Label>
									<Input
										id="email"
										type="email"
										autoComplete="email"
										placeholder="voce@exemplo.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={submitting}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Senha</Label>
									<Input
										id="password"
										type="password"
										autoComplete="current-password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										disabled={submitting}
									/>
								</div>

								<Button type="submit" className="w-full" disabled={submitting}>
									{submitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Entrando...
										</>
									) : (
										'Entrar'
									)}
								</Button>
							</form>
						</div>

						<p className="mt-6 text-center text-sm text-muted-foreground">
							Ainda não tem conta?{' '}
							<Link
								href="/register"
								className="font-medium text-primary hover:underline"
							>
								Criar cadastro
							</Link>
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={null}>
			<LoginContent />
		</Suspense>
	);
}
