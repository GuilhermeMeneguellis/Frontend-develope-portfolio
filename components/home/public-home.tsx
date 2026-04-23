'use client';

import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { ProjectsPreview } from '@/components/home/projects-preview';
import { SkillsPreview } from '@/components/home/skills-preview';
import { ContactPreview } from '@/components/home/contact-preview';

export function PublicHome() {
	return (
		<>
			<HeroSection />
			<AboutPreview />
			<ProjectsPreview />
			<SkillsPreview />
			<ContactPreview />
		</>
	);
}
