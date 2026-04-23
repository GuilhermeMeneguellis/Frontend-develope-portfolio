import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { loginSchema } from '@/lib/validations/auth';
import { findUserByEmail, upsertGoogleUser } from '@/lib/users';

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 7, // 7 dias
	},
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'select_account',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'E-mail', type: 'email' },
				password: { label: 'Senha', type: 'password' },
			},
			async authorize(credentials) {
				const parsed = loginSchema.safeParse(credentials);
				if (!parsed.success) return null;

				const user = await findUserByEmail(parsed.data.email);
				if (!user || !user.password_hash) return null;

				const valid = await bcrypt.compare(parsed.data.password, user.password_hash);
				if (!valid) return null;

				return {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image ?? undefined,
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google' && profile?.email) {
				const dbUser = await upsertGoogleUser({
					name: profile.name ?? user.name ?? profile.email,
					email: profile.email,
					image: (profile as { picture?: string }).picture ?? user.image ?? null,
					providerId: account.providerAccountId,
				});
				user.id = dbUser.id;
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user?.id) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.id && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
});
