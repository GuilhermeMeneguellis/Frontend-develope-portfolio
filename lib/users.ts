import { sql, type DbUser } from '@/lib/db';

export async function findUserByEmail(email: string): Promise<DbUser | null> {
	const rows = (await sql`
		SELECT id, name, email, email_verified, image, phone,
		       password_hash, provider, provider_id, created_at, updated_at
		FROM users
		WHERE email = ${email.toLowerCase()}
		LIMIT 1
	`) as DbUser[];
	return rows[0] ?? null;
}

export async function findUserById(id: string): Promise<DbUser | null> {
	const rows = (await sql`
		SELECT id, name, email, email_verified, image, phone,
		       password_hash, provider, provider_id, created_at, updated_at
		FROM users
		WHERE id = ${id}
		LIMIT 1
	`) as DbUser[];
	return rows[0] ?? null;
}

export type CreateCredentialsUserInput = {
	name: string;
	email: string;
	passwordHash: string;
	phone?: string | null;
};

export async function createCredentialsUser(input: CreateCredentialsUserInput): Promise<DbUser> {
	const rows = (await sql`
		INSERT INTO users (name, email, password_hash, phone, provider)
		VALUES (
			${input.name},
			${input.email.toLowerCase()},
			${input.passwordHash},
			${input.phone ?? null},
			'credentials'
		)
		RETURNING id, name, email, email_verified, image, phone,
		          password_hash, provider, provider_id, created_at, updated_at
	`) as DbUser[];
	return rows[0];
}

export type UpsertGoogleUserInput = {
	name: string;
	email: string;
	image: string | null;
	providerId: string;
};

/**
 * Cria ou atualiza o usuário vindo do Google.
 * Se já existir um usuário com o mesmo e-mail, os campos básicos são atualizados
 * e o provider_id é preenchido caso ainda não exista.
 */
export async function upsertGoogleUser(input: UpsertGoogleUserInput): Promise<DbUser> {
	const rows = (await sql`
		INSERT INTO users (name, email, image, provider, provider_id, email_verified)
		VALUES (
			${input.name},
			${input.email.toLowerCase()},
			${input.image},
			'google',
			${input.providerId},
			NOW()
		)
		ON CONFLICT (email) DO UPDATE SET
			name = EXCLUDED.name,
			image = COALESCE(EXCLUDED.image, users.image),
			provider_id = COALESCE(users.provider_id, EXCLUDED.provider_id),
			email_verified = COALESCE(users.email_verified, EXCLUDED.email_verified)
		RETURNING id, name, email, email_verified, image, phone,
		          password_hash, provider, provider_id, created_at, updated_at
	`) as DbUser[];
	return rows[0];
}
