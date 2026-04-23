import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});

const fraunces = Fraunces({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
	axes: ['opsz', 'SOFT'],
});

export const metadata: Metadata = {
	title: 'Guilherme Meneguelli - Portfolio',
	description: 'Portfólio profissional.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-BR"
			suppressHydrationWarning
			className={`${inter.variable} ${fraunces.variable}`}
		>
			<link rel="shortcut icon" href="https://cdn-icons-png.freepik.com/256/12539/12539811.png" type="image/x-icon" />
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					<Providers>
						<div className="relative min-h-screen flex flex-col">
							<Navbar />
							<main className="flex-grow pt-16">{children}</main>
							<Footer />
						</div>
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
