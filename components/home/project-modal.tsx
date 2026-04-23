'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	CheckCircle2,
	ExternalLink,
	Github,
	X as CloseIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { ProjectStatusBadge } from '@/components/ui/project-status-badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Project } from '@/lib/constants';
import { staggerContainer, fadeIn } from '@/lib/motion';

type ProjectModalProps = {
	project: Project | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
	if (!project) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[92vh] w-[96vw] max-w-4xl overflow-hidden border-white/10 bg-background/85 p-0 shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-background/70">
				{/* Close customizado pra sobrepor o header visual */}
				<DialogClose className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground transition-colors hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring">
					<CloseIcon className="h-4 w-4" />
					<span className="sr-only">Fechar</span>
				</DialogClose>

				<div className="flex max-h-[92vh] flex-col">
					{/* Header visual com imagem + gradiente */}
					<div className="relative h-48 w-full shrink-0 overflow-hidden md:h-64">
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 896px"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
						<ProjectStatusBadge
							status={project.status}
							className="absolute left-6 top-6 md:left-8 md:top-8"
							size="md"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
							<DialogTitle className="font-display text-3xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
								{project.title}
							</DialogTitle>
							{project.tagline ? (
								<DialogDescription className="mt-2 font-display text-base italic text-foreground/80 md:text-lg">
									{project.tagline}
								</DialogDescription>
							) : (
								<DialogDescription className="sr-only">
									Detalhes do projeto {project.title}
								</DialogDescription>
							)}
						</div>
					</div>

					{/* Corpo rolável */}
					<ScrollArea className="flex-1">
						<motion.div
							variants={staggerContainer()}
							initial="hidden"
							animate="show"
							className="space-y-8 px-6 py-6 md:px-8 md:py-8"
						>
							{/* Metadados: role · year · tags */}
							<motion.div
								variants={fadeIn('up', 0.1)}
								className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
							>
								{project.role ? <span>{project.role}</span> : null}
								{project.role && project.year ? (
									<span aria-hidden>·</span>
								) : null}
								{project.year ? <span>{project.year}</span> : null}
								{(project.role || project.year) && project.tags.length > 0 ? (
									<span aria-hidden className="h-3 w-px bg-white/20" />
								) : null}
								<div className="flex flex-wrap gap-1.5">
									{project.tags.slice(0, 4).map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="text-[10px] font-medium tracking-normal"
										>
											{tag}
										</Badge>
									))}
								</div>
							</motion.div>

							{/* O desafio */}
							{project.problem ? (
								<motion.section variants={fadeIn('up', 0.15)}>
									<h3 className="mb-3 font-display text-xl font-light tracking-tight text-foreground md:text-2xl">
										O desafio
									</h3>
									<p className="text-base leading-relaxed text-muted-foreground">
										{project.problem}
									</p>
								</motion.section>
							) : (
								<motion.section variants={fadeIn('up', 0.15)}>
									<p className="text-base leading-relaxed text-muted-foreground">
										{project.description}
									</p>
								</motion.section>
							)}

							{/* Destaques + Stack lado a lado */}
							{(project.highlights || project.stack) && (
								<motion.div
									variants={fadeIn('up', 0.2)}
									className="grid gap-8 md:grid-cols-2"
								>
									{project.highlights && project.highlights.length > 0 ? (
										<section>
											<h3 className="mb-4 font-display text-xl font-light tracking-tight text-foreground">
												Destaques
											</h3>
											<ul className="space-y-3">
												{project.highlights.map((item) => (
													<li key={item} className="flex items-start gap-3">
														<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
														<span className="text-sm leading-relaxed text-foreground/90">
															{item}
														</span>
													</li>
												))}
											</ul>
										</section>
									) : null}

									{project.stack && project.stack.length > 0 ? (
										<section>
											<h3 className="mb-4 font-display text-xl font-light tracking-tight text-foreground">
												Stack
											</h3>
											<div className="space-y-4">
												{project.stack.map((group) => (
													<div key={group.category}>
														<p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
															{group.category}
														</p>
														<div className="flex flex-wrap gap-1.5">
															{group.items.map((item) => (
																<Badge
																	key={item}
																	variant="outline"
																	className="border-white/10 bg-white/5 text-xs"
																>
																	{item}
																</Badge>
															))}
														</div>
													</div>
												))}
											</div>
										</section>
									) : null}
								</motion.div>
							)}

							{/* Métricas */}
							{project.metrics && project.metrics.length > 0 ? (
								<motion.section
									variants={fadeIn('up', 0.25)}
									className="grid gap-3 sm:grid-cols-3"
								>
									{project.metrics.map((metric) => (
										<div
											key={metric.label}
											className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
										>
											<p className="font-display text-2xl font-light text-primary md:text-3xl">
												{metric.value}
											</p>
											<p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
												{metric.label}
											</p>
										</div>
									))}
								</motion.section>
							) : null}
						</motion.div>
					</ScrollArea>

					{/* Footer sticky com CTAs */}
					{(project.link || project.repo) && (
						<div className="flex flex-col-reverse gap-2 border-t border-white/10 bg-background/60 px-6 py-4 backdrop-blur sm:flex-row sm:justify-end md:px-8">
							{project.repo ? (
								<Button variant="outline" asChild>
									<a
										href={project.repo}
										target="_blank"
										rel="noreferrer noopener"
									>
										<Github className="mr-2 h-4 w-4" />
										Repositório
									</a>
								</Button>
							) : null}
							{project.link ? (
								<Button asChild>
									<a
										href={project.link}
										target="_blank"
										rel="noreferrer noopener"
									>
										Ver demonstração
										<ExternalLink className="ml-2 h-4 w-4" />
									</a>
								</Button>
							) : null}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
