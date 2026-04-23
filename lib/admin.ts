/**
 * E-mail do administrador. Recebe acesso à aba /clientes e vê todas as solicitações.
 * Pode ser sobrescrito em produção via variável de ambiente ADMIN_EMAIL.
 */
export const ADMIN_EMAIL = (
	process.env.ADMIN_EMAIL ?? 'guilhermemeneguelli@gmail.com'
).toLowerCase();

export function isAdminEmail(email: string | null | undefined): boolean {
	if (!email) return false;
	return email.toLowerCase() === ADMIN_EMAIL;
}
