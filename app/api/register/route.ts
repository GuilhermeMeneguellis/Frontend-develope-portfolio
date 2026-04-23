import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { registerSchema } from '@/lib/validations/auth';
import { createCredentialsUser, findUserByEmail } from '@/lib/users';

export const runtime = 'nodejs';

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Corpo da requisição inválido' }, { status: 400 });
	}

	const parsed = registerSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{
				error: 'Dados inválidos',
				issues: parsed.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}

	const { name, email, phone, password } = parsed.data;

	try {
		const existing = await findUserByEmail(email);
		if (existing) {
			return NextResponse.json(
				{ error: 'Já existe uma conta com este e-mail' },
				{ status: 409 },
			);
		}

		const passwordHash = await bcrypt.hash(password, 12);

		const user = await createCredentialsUser({
			name,
			email,
			passwordHash,
			phone: phone && phone.length > 0 ? phone : null,
		});

		return NextResponse.json(
			{
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					provider: user.provider,
					createdAt: user.created_at,
				},
			},
			{ status: 201 },
		);
	} catch (err) {
		console.error('[/api/register] erro ao criar usuário:', err);
		return NextResponse.json(
			{ error: 'Erro interno ao criar usuário' },
			{ status: 500 },
		);
	}
}
