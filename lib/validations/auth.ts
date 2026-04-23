import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'E-mail obrigatório')
		.email('E-mail inválido')
		.max(255, 'E-mail muito longo'),
	password: z
		.string()
		.min(1, 'Senha obrigatória')
		.max(200, 'Senha muito longa'),
});

export const registerSchema = z
	.object({
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
			.max(32, 'Telefone muito longo')
			.optional()
			.or(z.literal('')),
		password: z
			.string()
			.min(8, 'Senha deve ter pelo menos 8 caracteres')
			.max(128, 'Senha muito longa')
			.regex(/[A-Z]/, 'Senha deve ter pelo menos uma letra maiúscula')
			.regex(/[a-z]/, 'Senha deve ter pelo menos uma letra minúscula')
			.regex(/[0-9]/, 'Senha deve ter pelo menos um número'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
