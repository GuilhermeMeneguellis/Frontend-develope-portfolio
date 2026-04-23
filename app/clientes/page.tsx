import { redirect } from 'next/navigation';
import { Users } from 'lucide-react';

import { auth } from '@/auth';
import { isAdminEmail } from '@/lib/admin';
import { listProjectRequests } from '@/lib/project-requests';
import { ClientesList } from '@/app/clientes/clientes-list';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
	title: 'Clientes · Guilherme Meneguelli',
	description: 'Solicitações de projeto recebidas.',
};

export default async function ClientesPage() {
	const session = await auth();

	if (!session?.user) {
		redirect('/login?callbackUrl=/clientes');
	}

	if (!isAdminEmail(session.user.email)) {
		redirect('/');
	}

	const requests = await listProjectRequests();

	return (
		<div className="container px-4 py-12 md:py-16">
			<header className="mb-10">
				<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
					<Users className="h-5 w-5 text-primary" />
				</div>
				<h1 className="font-display text-3xl font-light tracking-tight text-foreground md:text-5xl">
					Clientes
				</h1>
				<p className="mt-2 text-sm text-muted-foreground md:text-base">
					{requests.length === 0
						? 'Nenhuma solicitação ainda.'
						: `${requests.length} solicitação${requests.length > 1 ? 'ões' : ''} recebida${requests.length > 1 ? 's' : ''}.`}
				</p>
			</header>

			<ClientesList requests={requests} />
		</div>
	);
}
