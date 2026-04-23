import { sql } from '@/lib/db';

export type ProjectRequestStatus =
	| 'new'
	| 'contacted'
	| 'in-progress'
	| 'closed-won'
	| 'closed-lost';

export type DbProjectRequest = {
	id: string;
	user_id: string | null;
	name: string;
	email: string;
	phone: string | null;
	project_type: string;
	description: string;
	budget: string | null;
	timeline: string | null;
	references_info: string | null;
	status: ProjectRequestStatus;
	created_at: Date;
	updated_at: Date;
};

export type CreateProjectRequestInput = {
	userId?: string | null;
	name: string;
	email: string;
	phone?: string | null;
	projectType: string;
	description: string;
	budget?: string | null;
	timeline?: string | null;
	references?: string | null;
};

export async function createProjectRequest(
	input: CreateProjectRequestInput,
): Promise<DbProjectRequest> {
	const rows = (await sql`
		INSERT INTO project_requests (
			user_id, name, email, phone, project_type,
			description, budget, timeline, references_info
		)
		VALUES (
			${input.userId ?? null},
			${input.name},
			${input.email.toLowerCase()},
			${input.phone ?? null},
			${input.projectType},
			${input.description},
			${input.budget ?? null},
			${input.timeline ?? null},
			${input.references ?? null}
		)
		RETURNING id, user_id, name, email, phone, project_type,
		          description, budget, timeline, references_info,
		          status, created_at, updated_at
	`) as DbProjectRequest[];
	return rows[0];
}

export async function listProjectRequests(): Promise<DbProjectRequest[]> {
	const rows = (await sql`
		SELECT id, user_id, name, email, phone, project_type,
		       description, budget, timeline, references_info,
		       status, created_at, updated_at
		FROM project_requests
		ORDER BY created_at DESC
		LIMIT 500
	`) as DbProjectRequest[];
	return rows;
}
