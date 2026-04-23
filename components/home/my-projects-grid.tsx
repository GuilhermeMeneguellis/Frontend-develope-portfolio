'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ProjectStatusBadge } from '@/components/ui/project-status-badge';
import { ProjectModal } from '@/components/home/project-modal';
import { RequestProjectModal } from '@/components/home/request-project-modal';
import { projects, type Project } from '@/lib/constants';
import { staggerContainer, fadeInScale } from '@/lib/motion';

export function MyProjectsGrid() {
	const [selected, setSelected] = useState<Project | null>(null);
	const [open, setOpen] = useState(false);
	const [requestOpen, setRequestOpen] = useState(false);

	const handleOpen = (project: Project) => {
		setSelected(project);
		setOpen(true);
	};

	const handleOpenChange = (next: boolean) => {
		setOpen(next);
		// Mantém o projeto selecionado durante a animação de saída (evita "piscar" o conteúdo).
		if (!next) {
			setTimeout(() => setSelected(null), 250);
		}
	};

	return (
		<>
			<motion.div
				variants={staggerContainer()}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
			>
				{/* Card de CTA — solicitar projeto */}
				<motion.div variants={fadeInScale(0)}>
					<button
						type="button"
						onClick={() => setRequestOpen(true)}
						aria-label="Solicitar um projeto comigo"
						className="group relative flex h-full min-h-[340px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-gradient-to-br from-primary/10 via-background/40 to-secondary/10 p-8 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_50px_-10px_hsl(var(--primary)/0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
					>
						<div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/15 backdrop-blur transition-transform duration-300 group-hover:scale-110">
							<Sparkles className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h3 className="font-display text-2xl font-light tracking-tight text-foreground md:text-3xl">
								Tem uma ideia?
							</h3>
							<p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
								Me conta sobre o projeto que você quer tirar do papel. Respondo
								em até 48h.
							</p>
						</div>
						<span className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-primary">
							Solicitar projeto
							<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</span>
					</button>
				</motion.div>

				{projects.map((project, index) => (
					<motion.div
						key={project.title}
						variants={fadeInScale((index + 1) * 0.08)}
					>
						<button
							type="button"
							onClick={() => handleOpen(project)}
							aria-label={`Abrir detalhes de ${project.title}`}
							className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/40 text-left shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background supports-[backdrop-filter]:bg-background/25"
						>
							<div className="relative aspect-[16/10] w-full overflow-hidden">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
								<ProjectStatusBadge
									status={project.status}
									className="absolute left-3 top-3"
								/>
								<div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/60 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
									<ArrowUpRight className="h-4 w-4 text-foreground" />
								</div>
							</div>

							<div className="flex flex-1 flex-col gap-3 p-5">
								<div>
									<h3 className="font-display text-xl font-light tracking-tight text-foreground md:text-2xl">
										{project.title}
									</h3>
									<p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
										{project.tagline ?? project.description}
									</p>
								</div>

								<div className="mt-auto flex flex-wrap gap-1.5 pt-2">
									{project.tags.slice(0, 3).map((tag) => (
										<Badge
											key={tag}
											variant="outline"
											className="border-white/10 bg-white/5 text-[10px] font-normal tracking-wide"
										>
											{tag}
										</Badge>
									))}
									{project.tags.length > 3 ? (
										<span className="text-[10px] text-muted-foreground">
											+{project.tags.length - 3}
										</span>
									) : null}
								</div>
							</div>
						</button>
					</motion.div>
				))}
			</motion.div>

			<ProjectModal
				project={selected}
				open={open}
				onOpenChange={handleOpenChange}
			/>
			<RequestProjectModal
				open={requestOpen}
				onOpenChange={setRequestOpen}
			/>
		</>
	);
}
