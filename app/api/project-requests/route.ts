import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { isAdminEmail } from '@/lib/admin';
import { projectRequestSchema } from '@/lib/validations/project-request';
import {
	createProjectRequest,
	listProjectRequests,
} from '@/lib/project-requests';

export const runtime = 'nodejs';

/**
 * POST — público. Qualquer visitante pode enviar uma solicitação de projeto.
 * Se estiver logado, vinculamos ao user_id automaticamente.
 */
export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: 'Corpo da requisição inválido' },
			{ status: 400 },
		);
	}

	const parsed = projectRequestSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{
				error: 'Dados inválidos',
				issues: parsed.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}

	const session = await auth();

	try {
		const created = await createProjectRequest({
			userId: session?.user?.id ?? null,
			name: parsed.data.name,
			email: parsed.data.email,
			phone: parsed.data.phone || null,
			projectType: parsed.data.projectType,
			description: parsed.data.description,
			budget: parsed.data.budget || null,
			timeline: parsed.data.timeline || null,
			references: parsed.data.references || null,
		});

		return NextResponse.json(
			{
				id: created.id,
				createdAt: created.created_at,
			},
			{ status: 201 },
		);
	} catch (err) {
		console.error('[/api/project-requests][POST] erro:', err);
		return NextResponse.json(
			{ error: 'Erro interno ao registrar solicitação' },
			{ status: 500 },
		);
	}
}

/**
 * GET — admin-only. Lista todas as solicitações para a tela /clientes.
 */
export async function GET() {
	const session = await auth();

	if (!isAdminEmail(session?.user?.email)) {
		return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
	}

	try {
		const requests = await listProjectRequests();
		return NextResponse.json({ requests });
	} catch (err) {
		console.error('[/api/project-requests][GET] erro:', err);
		return NextResponse.json(
			{ error: 'Erro interno ao listar solicitações' },
			{ status: 500 },
		);
	}
}
