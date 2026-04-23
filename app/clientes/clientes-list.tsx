'use client';

import { useState } from 'react';
import { Mail, Phone, Calendar, ChevronDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type { DbProjectRequest } from '@/lib/project-requests';

type Props = { requests: DbProjectRequest[] };

const projectTypeLabels: Record<string, string> = {
	web: 'Site / Web',
	mobile: 'Mobile',
	fullstack: 'Full Stack',
	saas: 'SaaS',
	landing: 'Landing',
	other: 'Outro',
};

const statusLabels: Record<string, { label: string; classes: string }> = {
	new: {
		label: 'Nova',
		classes: 'border-amber-500/30 bg-amber-500/15 text-amber-200',
	},
	contacted: {
		label: 'Contatada',
		classes: 'border-sky-500/30 bg-sky-500/15 text-sky-200',
	},
	'in-progress': {
		label: 'Em andamento',
		classes: 'border-primary/30 bg-primary/15 text-primary',
	},
	'closed-won': {
		label: 'Fechada',
		classes: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
	},
	'closed-lost': {
		label: 'Perdida',
		classes: 'border-white/15 bg-white/10 text-foreground/70',
	},
};

function formatDate(d: Date | string) {
	const date = typeof d === 'string' ? new Date(d) : d;
	return date.toLocaleString('pt-BR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function ClientesList({ requests }: Props) {
	const [expanded, setExpanded] = useState<string | null>(null);

	if (requests.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
				<p className="text-sm text-muted-foreground">
					Assim que a primeira solicitação chegar, ela aparece aqui.
				</p>
			</div>
		);
	}

	return (
		<ul className="space-y-3">
			{requests.map((req) => {
				const isOpen = expanded === req.id;
				const statusCfg = statusLabels[req.status] ?? statusLabels.new;
				const typeLabel = projectTypeLabels[req.project_type] ?? req.project_type;

				return (
					<li
						key={req.id}
						className="overflow-hidden rounded-2xl border border-white/10 bg-background/40 backdrop-blur"
					>
						<button
							type="button"
							onClick={() => setExpanded(isOpen ? null : req.id)}
							className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5"
							aria-expanded={isOpen}
						>
							<div className="min-w-0 flex-1">
								<div className="flex flex-wrap items-center gap-2">
									<span className="font-medium text-foreground">{req.name}</span>
									<Badge
										variant="outline"
										className="border-white/10 bg-white/5 text-[10px]"
									>
										{typeLabel}
									</Badge>
									<span
										className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusCfg.classes}`}
									>
										{statusCfg.label}
									</span>
								</div>
								<div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
									<span className="inline-flex items-center gap-1">
										<Mail className="h-3 w-3" />
										{req.email}
									</span>
									{req.phone ? (
										<span className="inline-flex items-center gap-1">
											<Phone className="h-3 w-3" />
											{req.phone}
										</span>
									) : null}
									<span className="inline-flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										{formatDate(req.created_at)}
									</span>
								</div>
							</div>
							<ChevronDown
								className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
							/>
						</button>

						{isOpen ? (
							<div className="space-y-4 border-t border-white/10 px-5 py-5 text-sm">
								<section>
									<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
										Descrição
									</p>
									<p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
										{req.description}
									</p>
								</section>

								<div className="grid gap-4 sm:grid-cols-2">
									{req.budget ? (
										<section>
											<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
												Orçamento
											</p>
											<p className="text-foreground/90">{req.budget}</p>
										</section>
									) : null}
									{req.timeline ? (
										<section>
											<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
												Prazo
											</p>
											<p className="text-foreground/90">{req.timeline}</p>
										</section>
									) : null}
								</div>

								{req.references_info ? (
									<section>
										<p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
											Referências
										</p>
										<p className="whitespace-pre-wrap text-foreground/90">
											{req.references_info}
										</p>
									</section>
								) : null}

								<div className="flex flex-wrap gap-2 pt-2">
									<a
										href={`mailto:${req.email}?subject=Re: sua solicitação de projeto`}
										className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/10"
									>
										<Mail className="h-3.5 w-3.5" />
										Responder
									</a>
									{req.phone ? (
										<a
											href={`https://wa.me/55${req.phone.replace(/\D/g, '')}`}
											target="_blank"
											rel="noreferrer noopener"
											className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/10"
										>
											<Phone className="h-3.5 w-3.5" />
											WhatsApp
										</a>
									) : null}
								</div>
							</div>
						) : null}
					</li>
				);
			})}
		</ul>
	);
}
