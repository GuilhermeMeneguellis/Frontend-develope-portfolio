'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

import { PublicHome } from '@/components/home/public-home';
import { AuthenticatedHome } from '@/components/home/authenticated-home';

export default function Home() {
	const { status } = useSession();
	const isLoading = status === 'loading';

	return (
		<>
			<AnimatePresence>
				{isLoading && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-background"
						initial={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<motion.div
							className="flex flex-col items-center"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<motion.div
								className="w-16 h-16 border-t-4 border-primary border-solid rounded-full"
								animate={{ rotate: 360 }}
								transition={{
									repeat: Infinity,
									duration: 1,
									ease: 'linear',
								}}
							/>
							<motion.p
								className="mt-4 text-lg"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ repeat: Infinity, duration: 1.5 }}
							>
								Carregando...
							</motion.p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{status === 'authenticated' ? <AuthenticatedHome /> : null}
			{status === 'unauthenticated' ? <PublicHome /> : null}
		</>
	);
}
