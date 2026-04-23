'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
	AlertCircle,
	CheckCircle2,
	Loader2,
	Send,
	Sparkles,
	X as CloseIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
	budgetOptions,
	projectRequestSchema,
	projectTypeOptions,
	timelineOptions,
} from '@/lib/validations/project-request';
import { fadeIn, staggerContainer } from '@/lib/motion';

type RequestProjectModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

type FormState = {
	name: string;
	email: string;
	phone: string;
	projectType: string;
	description: string;
	budget: string;
	timeline: string;
	references: string;
};

const initialState: FormState = {
	name: '',
	email: '',
	phone: '',
	projectType: '',
	description: '',
	budget: '',
	timeline: '',
	references: '',
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function RequestProjectModal({
	open,
	onOpenChange,
}: RequestProjectModalProps) {
	const { data: session } = useSession();
	const [form, setForm] = useState<FormState>(initialState);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [submitting, setSubmitting] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	// Pré-preenche nome/email quando o usuário está logado.
	useEffect(() => {
		if (open && session?.user) {
			setForm((prev) => ({
				...prev,
				name: prev.name || session.user.name || '',
				email: prev.email || session.user.email || '',
			}));
		}
	}, [open, session]);

	// Reseta ao fechar (após animação de saída).
	useEffect(() => {
		if (!open) {
			const id = setTimeout(() => {
				setForm(initialState);
				setErrors({});
				setApiError(null);
				setSuccess(false);
			}, 250);
			return () => clearTimeout(id);
		}
	}, [open]);

	const update =
		(field: keyof FormState) =>
		(
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			if (errors[field]) {
				setErrors((prev) => ({ ...prev, [field]: undefined }));
			}
		};

	const handleSelect = (field: keyof FormState) => (value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setApiError(null);
		setErrors({});

		const parsed = projectRequestSchema.safeParse(form);
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
			const res = await fetch('/api/project-requests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			});
			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				if (data?.issues) {
					const mapped: FieldErrors = {};
					for (const [k, v] of Object.entries(data.issues)) {
						if (Array.isArray(v) && v.length > 0) {
							mapped[k as keyof FormState] = String(v[0]);
						}
					}
					setErrors(mapped);
				} else {
					setApiError(data?.error ?? 'Erro ao enviar solicitação.');
				}
				setSubmitting(false);
				return;
			}

			setSuccess(true);
			setSubmitting(false);
			// Fecha automaticamente após 2.5s
			setTimeout(() => onOpenChange(false), 2500);
		} catch (err) {
			console.error(err);
			setApiError('Erro de rede. Verifique sua conexão e tente novamente.');
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[92vh] w-[96vw] max-w-2xl overflow-hidden border-white/10 bg-background/90 p-0 shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75">
				<DialogClose className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground transition-colors hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring">
					<CloseIcon className="h-4 w-4" />
					<span className="sr-only">Fechar</span>
				</DialogClose>

				<div className="flex max-h-[92vh] flex-col">
					<div className="shrink-0 border-b border-white/10 px-6 pb-5 pt-7 md:px-8">
						<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur">
							<Sparkles className="h-5 w-5 text-primary" />
						</div>
						<DialogTitle className="font-display text-2xl font-light leading-tight tracking-tight text-foreground md:text-3xl">
							Solicitar um projeto
						</DialogTitle>
						<DialogDescription className="mt-1 text-sm text-muted-foreground">
							Conta um pouco sobre a ideia — eu respondo em até 48h.
						</DialogDescription>
					</div>

					{success ? (
						<div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center md:px-8">
							<div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
								<CheckCircle2 className="h-7 w-7 text-emerald-400" />
							</div>
							<h3 className="font-display text-2xl font-light text-foreground">
								Recebi sua solicitação!
							</h3>
							<p className="max-w-sm text-sm text-muted-foreground">
								Vou analisar e retornar por e-mail em breve. Obrigado pela
								confiança.
							</p>
						</div>
					) : (
						<ScrollArea className="flex-1">
							<motion.form
								variants={staggerContainer()}
								initial="hidden"
								animate="show"
								onSubmit={handleSubmit}
								className="space-y-5 px-6 py-6 md:px-8"
							>
								{apiError ? (
									<div
										role="alert"
										className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/15 p-3 text-sm text-destructive"
									>
										<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
										<span>{apiError}</span>
									</div>
								) : null}

								<motion.div
									variants={fadeIn('up', 0.05)}
									className="grid gap-4 md:grid-cols-2"
								>
									<Field label="Seu nome" id="name" error={errors.name} required>
										<Input
											id="name"
											autoComplete="name"
											value={form.name}
											onChange={update('name')}
											disabled={submitting}
										/>
									</Field>
									<Field
										label="Seu e-mail"
										id="email"
										error={errors.email}
										required
									>
										<Input
											id="email"
											type="email"
											autoComplete="email"
											value={form.email}
											onChange={update('email')}
											disabled={submitting}
										/>
									</Field>
								</motion.div>

								<motion.div
									variants={fadeIn('up', 0.1)}
									className="grid gap-4 md:grid-cols-2"
								>
									<Field label="Telefone / WhatsApp" id="phone" error={errors.phone}>
										<Input
											id="phone"
											type="tel"
											autoComplete="tel"
											placeholder="(00) 00000-0000"
											value={form.phone}
											onChange={update('phone')}
											disabled={submitting}
										/>
									</Field>
									<Field
										label="Tipo de projeto"
										id="projectType"
										error={errors.projectType}
										required
									>
										<Select
											value={form.projectType}
											onValueChange={handleSelect('projectType')}
											disabled={submitting}
										>
											<SelectTrigger id="projectType">
												<SelectValue placeholder="Escolha uma opção" />
											</SelectTrigger>
											<SelectContent>
												{projectTypeOptions.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>
								</motion.div>

								<motion.div variants={fadeIn('up', 0.15)}>
									<Field
										label="Conte sobre o projeto"
										id="description"
										error={errors.description}
										required
										hint="Qual é o problema que quer resolver? Para quem é? O que já existe hoje?"
									>
										<Textarea
											id="description"
											rows={5}
											value={form.description}
											onChange={update('description')}
											disabled={submitting}
											className="min-h-[120px] resize-none"
										/>
									</Field>
								</motion.div>

								<motion.div
									variants={fadeIn('up', 0.2)}
									className="grid gap-4 md:grid-cols-2"
								>
									<Field label="Orçamento estimado" id="budget" error={errors.budget}>
										<Select
											value={form.budget}
											onValueChange={handleSelect('budget')}
											disabled={submitting}
										>
											<SelectTrigger id="budget">
												<SelectValue placeholder="Opcional" />
											</SelectTrigger>
											<SelectContent>
												{budgetOptions.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>
									<Field label="Prazo desejado" id="timeline" error={errors.timeline}>
										<Select
											value={form.timeline}
											onValueChange={handleSelect('timeline')}
											disabled={submitting}
										>
											<SelectTrigger id="timeline">
												<SelectValue placeholder="Opcional" />
											</SelectTrigger>
											<SelectContent>
												{timelineOptions.map((opt) => (
													<SelectItem key={opt.value} value={opt.value}>
														{opt.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>
								</motion.div>

								<motion.div variants={fadeIn('up', 0.25)}>
									<Field
										label="Referências ou inspirações"
										id="references"
										error={errors.references}
										hint="Links de sites, apps ou projetos que você curte — opcional"
									>
										<Textarea
											id="references"
											rows={2}
											value={form.references}
											onChange={update('references')}
											disabled={submitting}
											className="min-h-[64px] resize-none"
										/>
									</Field>
								</motion.div>

								<motion.div variants={fadeIn('up', 0.3)}>
									<Button
										type="submit"
										className="w-full"
										disabled={submitting}
									>
										{submitting ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Enviando...
											</>
										) : (
											<>
												Enviar solicitação
												<Send className="ml-2 h-4 w-4" />
											</>
										)}
									</Button>
								</motion.div>
							</motion.form>
						</ScrollArea>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function Field({
	id,
	label,
	error,
	hint,
	required,
	children,
}: {
	id: string;
	label: string;
	error?: string;
	hint?: string;
	required?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id} className="text-sm">
				{label}
				{required ? <span className="ml-0.5 text-destructive">*</span> : null}
			</Label>
			{children}
			{error ? (
				<p className="text-xs text-destructive">{error}</p>
			) : hint ? (
				<p className="text-xs text-muted-foreground">{hint}</p>
			) : null}
		</div>
	);
}
