'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

import { LavaBackground } from '@/components/ui/lava-background';
import { MyProjectsGrid } from '@/components/home/my-projects-grid';
import { fadeIn, staggerContainer } from '@/lib/motion';

function firstName(fullName?: string | null): string {
	if (!fullName) return 'de volta';
	const first = fullName.trim().split(/\s+/)[0];
	return first || 'de volta';
}

export function AuthenticatedHome() {
	const { data: session } = useSession();
	const name = firstName(session?.user?.name);

	return (
		<>
			{/* Saudação com lava background sutil */}
			<section className="relative overflow-hidden">
				<LavaBackground />
				<div aria-hidden className="absolute inset-0 z-[1] bg-background/60" />
				<div
					aria-hidden
					className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background"
				/>

				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="container relative z-10 px-4 py-20 md:py-28"
				>
					<motion.div
						variants={fadeIn('up', 0.2)}
						className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60"
					>
						<span aria-hidden className="h-px w-8 bg-foreground/30" />
						<span>Área autenticada</span>
					</motion.div>

					<motion.h1
						variants={fadeIn('up', 0.3)}
						className="font-display text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
					>
						Olá, <span className="italic font-normal">{name}</span>.
					</motion.h1>

					<motion.p
						variants={fadeIn('up', 0.4)}
						className="mt-6 max-w-2xl font-display text-lg font-light italic leading-relaxed text-foreground/75 md:text-xl"
					>
						Esses são os projetos que já construí e lancei. Clique em qualquer
						card para conhecer a história por trás dele.
					</motion.p>
				</motion.div>
			</section>

			{/* Grade de projetos */}
			<section className="relative py-12 md:py-16">
				<div className="container px-4">
					<MyProjectsGrid />
				</div>
			</section>
		</>
	);
}
