'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function initialsFrom(name?: string | null, email?: string | null): string {
	const source = name || email || '';
	const parts = source.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? '';
	const second = parts.length > 1 ? parts[parts.length - 1][0] : '';
	return (first + second).toUpperCase() || 'U';
}

export function UserMenu() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className="h-10 w-24 animate-pulse rounded-md bg-muted" aria-hidden />
		);
	}

	if (!session?.user) {
		return (
			<Link href="/login">
				<Button>
					<LogIn className="mr-2 h-4 w-4" />
					Entrar
				</Button>
			</Link>
		);
	}

	const { user } = session;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted"
					aria-label="Menu do usuário"
				>
					<Avatar className="h-9 w-9 border border-border">
						{user.image ? (
							<AvatarImage src={user.image} alt={user.name ?? 'Usuário'} />
						) : null}
						<AvatarFallback>{initialsFrom(user.name, user.email)}</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					<span className="text-sm font-medium">{user.name ?? 'Usuário'}</span>
					{user.email ? (
						<span className="truncate text-xs text-muted-foreground">
							{user.email}
						</span>
					) : null}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/register" className="cursor-pointer">
						<UserIcon className="mr-2 h-4 w-4" />
						Completar cadastro
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-destructive focus:text-destructive"
					onSelect={(event) => {
						event.preventDefault();
						signOut({ callbackUrl: '/' });
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
