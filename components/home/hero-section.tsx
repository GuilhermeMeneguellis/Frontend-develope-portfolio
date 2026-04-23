'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LavaBackground } from '@/components/ui/lava-background';
import { fadeIn, staggerContainer } from '@/lib/motion';

export function HeroSection() {
	return (
		<section className="relative overflow-hidden">
			<LavaBackground />

			{/* Content */}
			<div className="container relative z-10 px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh]">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="max-w-3xl mx-auto text-center rounded-3xl border border-white/10 bg-background/40 p-8 md:p-12 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/25"
				>
					<motion.div
						variants={fadeIn('up', 0.2)}
						className="mb-6 flex items-center justify-center gap-3 text-xs md:text-sm font-medium uppercase tracking-[0.35em] text-foreground/60"
					>
						<span aria-hidden className="h-px w-8 bg-foreground/30" />
						<span>Engenharia de Software</span>
						<span aria-hidden className="h-px w-8 bg-foreground/30" />
					</motion.div>

					<motion.h1
						variants={fadeIn('up', 0.3)}
						className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
					>
						Guilherme
						<br />
						<span className="italic font-normal text-foreground/95">
							Meneguelli
						</span>
					</motion.h1>

					<motion.div
						variants={fadeIn('up', 0.4)}
						aria-hidden
						className="mx-auto mt-8 h-px w-16 bg-foreground/40"
					/>

					<motion.p
						variants={fadeIn('up', 0.5)}
						className="mt-8 font-display text-lg md:text-xl italic font-light text-foreground/80 max-w-2xl mx-auto leading-relaxed"
					>
						Uma vitrine dos meus projetos, habilidades e conquistas no universo da engenharia.
					</motion.p>

					<motion.div
						variants={fadeIn('up', 0.7)}
						className="mt-10 flex flex-wrap gap-4 justify-center"
					>
						<Button size="lg" asChild>
							<Link href="/projects">
								Ver projetos <ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/cv.pdf" download>
								Baixar currículo <FileDown className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</div>

			{/* Bottom gradient */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]"></div>
		</section>
	);
}
