import { cn } from '@/lib/utils';

export type ProjectStatus = 'launched' | 'launching' | 'in-development';

const configs: Record<
	ProjectStatus,
	{ label: string; pill: string; dot: string }
> = {
	launched: {
		label: 'Lançado',
		pill: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300',
		dot: 'bg-emerald-400',
	},
	launching: {
		label: 'Em lançamento',
		pill: 'border-amber-500/30 bg-amber-500/15 text-amber-200',
		dot: 'bg-amber-400',
	},
	'in-development': {
		label: 'Em desenvolvimento',
		pill: 'border-white/15 bg-white/10 text-foreground/80',
		dot: 'bg-foreground/50',
	},
};

type Props = {
	status: ProjectStatus;
	className?: string;
	size?: 'sm' | 'md';
};

export function ProjectStatusBadge({ status, className, size = 'sm' }: Props) {
	const cfg = configs[status];

	return (
		<span
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full border font-medium uppercase tracking-[0.15em] backdrop-blur',
				size === 'sm'
					? 'px-2.5 py-1 text-[10px]'
					: 'px-3 py-1.5 text-xs',
				cfg.pill,
				className,
			)}
		>
			<span
				aria-hidden
				className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)}
			/>
			{cfg.label}
		</span>
	);
}
