import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL não configurada. Copie .env.example para .env.local e preencha.');
}

export const sql = neon(process.env.DATABASE_URL);

export type DbUser = {
	id: string;
	name: string;
	email: string;
	email_verified: Date | null;
	image: string | null;
	phone: string | null;
	password_hash: string | null;
	provider: 'google' | 'credentials';
	provider_id: string | null;
	created_at: Date;
	updated_at: Date;
};
