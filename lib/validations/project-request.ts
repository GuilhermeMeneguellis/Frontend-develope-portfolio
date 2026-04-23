import { z } from 'zod';

export const projectTypeOptions = [
	{ value: 'web', label: 'Site / Aplicação Web' },
	{ value: 'mobile', label: 'Aplicativo Mobile' },
	{ value: 'fullstack', label: 'Plataforma Full Stack' },
	{ value: 'saas', label: 'SaaS / Produto' },
	{ value: 'landing', label: 'Landing Page' },
	{ value: 'other', label: 'Outro' },
] as const;

export const budgetOptions = [
	{ value: 'até R$ 5k', label: 'Até R$ 5.000' },
	{ value: 'R$ 5k – R$ 15k', label: 'R$ 5.000 – R$ 15.000' },
	{ value: 'R$ 15k – R$ 30k', label: 'R$ 15.000 – R$ 30.000' },
	{ value: 'R$ 30k+', label: 'Acima de R$ 30.000' },
	{ value: 'a combinar', label: 'Prefiro conversar' },
] as const;

export const timelineOptions = [
	{ value: 'urgente', label: 'Urgente (< 1 mês)' },
	{ value: '1-3 meses', label: '1 a 3 meses' },
	{ value: '3-6 meses', label: '3 a 6 meses' },
	{ value: 'flexível', label: 'Sem pressa / flexível' },
] as const;

export const projectRequestSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, 'Nome deve ter pelo menos 2 caracteres')
		.max(120, 'Nome muito longo'),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, 'E-mail obrigatório')
		.email('E-mail inválido')
		.max(255, 'E-mail muito longo'),
	phone: z
		.string()
		.trim()
		.max(32)
		.optional()
		.or(z.literal('')),
	projectType: z.enum(['web', 'mobile', 'fullstack', 'saas', 'landing', 'other'], {
		errorMap: () => ({ message: 'Selecione um tipo de projeto' }),
	}),
	description: z
		.string()
		.trim()
		.min(20, 'Conte um pouquinho mais (mínimo 20 caracteres)')
		.max(2000, 'Descrição muito longa'),
	budget: z.string().trim().max(60).optional().or(z.literal('')),
	timeline: z.string().trim().max(60).optional().or(z.literal('')),
	references: z
		.string()
		.trim()
		.max(1000, 'Referências muito longas')
		.optional()
		.or(z.literal('')),
});

export type ProjectRequestInput = z.infer<typeof projectRequestSchema>;
