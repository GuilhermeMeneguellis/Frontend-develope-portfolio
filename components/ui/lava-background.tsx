'use client';

import { useEffect, useRef } from 'react';

/**
 * Faz um blob seguir o cursor com lerp (interpolação suave).
 *
 * Otimizações:
 * - Uma única escrita no DOM por frame (transform3d = camada GPU).
 * - rAF só roda enquanto a posição ainda não "alcançou" o alvo (threshold 0.2px).
 * - IntersectionObserver pausa tudo quando o hero sai da viewport.
 * - Respeita prefers-reduced-motion e desliga em dispositivos touch.
 */
function useMouseBlob() {
	const containerRef = useRef<HTMLDivElement>(null);
	const blobRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const blob = blobRef.current;
		if (!container || !blob) return;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = window.matchMedia('(pointer: coarse)').matches;
		if (reduceMotion || isTouch) return;

		let rafId: number | null = null;
		let visible = false;
		let initialized = false;
		const target = { x: 0, y: 0 };
		const current = { x: 0, y: 0 };

		const tick = () => {
			const dx = target.x - current.x;
			const dy = target.y - current.y;
			current.x += dx * 0.1;
			current.y += dy * 0.1;
			blob.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

			if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
				rafId = requestAnimationFrame(tick);
			} else {
				rafId = null;
			}
		};

		const startLoop = () => {
			if (rafId == null && visible) {
				rafId = requestAnimationFrame(tick);
			}
		};

		const handleMove = (e: MouseEvent) => {
			if (!visible) return;
			const rect = container.getBoundingClientRect();
			target.x = e.clientX - rect.left;
			target.y = e.clientY - rect.top;
			if (!initialized) {
				current.x = target.x;
				current.y = target.y;
				initialized = true;
				blob.style.opacity = '1';
			}
			startLoop();
		};

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (!visible && rafId != null) {
					cancelAnimationFrame(rafId);
					rafId = null;
				}
			},
			{ threshold: 0 },
		);
		io.observe(container);

		window.addEventListener('mousemove', handleMove, { passive: true });

		return () => {
			io.disconnect();
			window.removeEventListener('mousemove', handleMove);
			if (rafId != null) cancelAnimationFrame(rafId);
		};
	}, []);

	return { containerRef, blobRef };
}

export function LavaBackground() {
	const { containerRef, blobRef } = useMouseBlob();

	return (
		<div ref={containerRef} className="lava-container">
			<svg
				aria-hidden="true"
				focusable="false"
				width="0"
				height="0"
				style={{ position: 'absolute' }}
			>
				<defs>
					<filter id="lava-goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="
								1 0 0 0 0
								0 1 0 0 0
								0 0 1 0 0
								0 0 0 18 -8
							"
							result="goo"
						/>
						<feComposite in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>

			<div className="lava-blobs">
				<div className="lava-blob lava-blob--1" />
				<div className="lava-blob lava-blob--2" />
				<div className="lava-blob lava-blob--3" />
				<div className="lava-blob lava-blob--4" />
				<div className="lava-blob lava-blob--5" />
				<div ref={blobRef} className="lava-blob lava-blob--mouse" />
			</div>
		</div>
	);
}
