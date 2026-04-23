import type { StaticImageData } from 'next/image';

import governoPresenteImage from '@/assets/image.png';
import saudeProMaisImage from '@/assets/imagem2.png';
import parabellumImage from '@/assets/imagem3.png';
import cristianoEmpImage from '@/assets/imagem4.png';
import radioKBumImage from '@/assets/imagem5.jpeg';
import leapImage from '@/assets/imagem6.png';
import setboxImage from '@/assets/imagem7.png';

import type { ProjectStatus } from '@/components/ui/project-status-badge';

export const siteConfig = {
	name: 'Portfólio de Engenharia',
	description:
		'Um modelo profissional de site de portfólio para estudantes de engenharia.',
	mainNav: [
		{
			title: 'Início',
			href: '/',
		},
		{
			title: 'Sobre',
			href: '/about',
		},
		{
			title: 'Formação',
			href: '/education',
		},
		{
			title: 'Habilidades',
			href: '/skills',
		},
		{
			title: 'Experiência',
			href: '/experience',
		},
		{
			title: 'Projetos',
			href: '/projects',
		},
		{
			title: 'Certificados',
			href: '/certificates',
		},
		{
			title: 'Blog',
			href: '/blog',
		},
		{
			title: 'Contato',
			href: '/contact',
		},
	],
	links: {
		github: 'https://github.com/GuilhermeMeneguellis',
		linkedin: 'https://www.linkedin.com/in/guilherme-de-souza-nunes-meneguelli-065021316/',
		twitter: 'https://twitter.com/yourusername',
		facebook: 'https://facebook.com/yourusername',
		instagram: 'https://instagram.com/yourusername',
		whatsapp: 'https://wa.me/5524999638117',
		email: 'mailto:engenhariadesoftwareguilherme@gmail.com',
		phone: 'tel:+5524999638117',
	},
};

export type Experience = {
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
};

export const experiences: Experience[] = [
	{
		title: 'Estagiário de Engenharia',
		company: 'Empresa de Tecnologia',
		location: 'Cidade, País',
		startDate: 'mai. 2023',
		endDate: 'ago. 2023',
		description: [
			'Atuei no desenvolvimento e nos testes de componentes de software para sistemas embarcados',
			'Colaborei com engenheiros seniores no planejamento e na execução de projetos',
			'Implementei procedimentos de teste para garantir a qualidade das entregas',
		],
		technologies: ['C++', 'Python', 'MATLAB', 'Git'],
	},
	{
		title: 'Assistente de Pesquisa',
		company: 'Laboratório Universitário',
		location: 'Cidade, País',
		startDate: 'jan. 2023',
		endDate: 'abr. 2023',
		description: [
			'Auxiliei em pesquisas focadas em materiais avançados para aplicações mecânicas',
			'Realizei revisões bibliográficas e organizei os principais achados da pesquisa',
			'Executei análises de dados e visualizei resultados experimentais',
		],
		technologies: ['MATLAB', 'CAD', 'Análise de Dados', 'Python'],
	},
];

export type Project = {
	title: string;
	description: string;
	image: string | StaticImageData;
	tags: string[];
	status: ProjectStatus;
	link?: string;
	repo?: string;
	// Campos opcionais para o modal "propaganda" — se ausentes, a seção correspondente some.
	tagline?: string;
	problem?: string;
	highlights?: string[];
	stack?: { category: string; items: string[] }[];
	metrics?: { label: string; value: string }[];
	role?: string;
	year?: string;
};

export const projects: Project[] = [
	{
		title: 'Saude Pro Mais',
		description:
			'Plataforma web desenvolvida com TypeScript, Node.js, Next.js, Nest.js e React, utilizando Neon PostgreSQL como base de dados para sustentar uma aplicação moderna, escalável e orientada a performance.',
		image: saudeProMaisImage,
		tags: ['TypeScript', 'Node.js', 'Next.js', 'Nest.js', 'React', 'Neon PostgreSQL'],
		status: 'launched',
		link: 'https://www.saudepromais.com.br/',
		tagline: 'Saúde acessível, do cadastro ao atendimento — tudo em uma plataforma.',
		problem:
			'Cooperativas de saúde precisavam de uma plataforma moderna para gerir associados, vendas de planos e atendimento, sem depender de sistemas legados lentos e desconectados. O desafio era entregar uma solução escalável, segura e com experiência fluida tanto para o administrador quanto para o beneficiário final.',
		highlights: [
			'Cadastro completo de beneficiários com validação em tempo real',
			'Dashboard administrativo com métricas de vendas e adesões',
			'Integração com gateway de pagamento e emissão automática de boletos',
			'Autenticação multi-perfil (admin, vendedor, beneficiário)',
			'Deploy serverless com performance otimizada via Neon Postgres',
		],
		stack: [
			{ category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
			{ category: 'Backend', items: ['Node.js', 'Nest.js', 'REST APIs'] },
			{ category: 'Banco de dados', items: ['Neon PostgreSQL', 'Prisma ORM'] },
			{ category: 'Infraestrutura', items: ['Vercel', 'Serverless Functions'] },
		],
		metrics: [
			{ label: 'Tempo médio de cadastro', value: '< 3 min' },
			{ label: 'Uptime', value: '99.9%' },
			{ label: 'Ambiente', value: 'Produção' },
		],
		role: 'Full Stack Developer',
		year: '2024',
	},
	{
		title: 'Governo Presente',
		description:
			'Aplicativo mobile desenvolvido com React Native e Expo, distribuído para Play Store e App Store para ampliar o acesso da população a serviços e funcionalidades institucionais.',
		image: governoPresenteImage,
		tags: ['React Native', 'Expo', 'Play Store', 'App Store'],
		status: 'launched',
		link: 'https://appbarramansa.com.br/',
		tagline: 'A prefeitura de Barra Mansa no bolso de cada cidadão.',
		problem:
			'A prefeitura precisava aproximar serviços públicos da população sem depender exclusivamente do atendimento presencial. O desafio era entregar um app mobile estável nas duas grandes lojas (Google Play e App Store) que funcionasse para perfis muito diferentes de usuários e integrasse em um único lugar serviços de saúde, educação, protocolos e comunicação institucional.',
		highlights: [
			'Publicação em Google Play e App Store com fluxo de release automatizado',
			'Notificações push para campanhas e alertas municipais',
			'Integração com APIs internas da prefeitura (protocolos, agendamentos, serviços)',
			'Interface pensada para diferentes faixas etárias e baixa literacia digital',
			'Suporte multi-módulo: saúde, educação, tributação e serviços gerais',
		],
		stack: [
			{ category: 'Mobile', items: ['React Native', 'Expo', 'TypeScript'] },
			{ category: 'Integrações', items: ['REST APIs', 'Push Notifications'] },
			{ category: 'Distribuição', items: ['Google Play', 'App Store', 'EAS Build'] },
		],
		metrics: [
			{ label: 'Lojas', value: 'iOS + Android' },
			{ label: 'Abrangência', value: 'Municipal' },
			{ label: 'Ambiente', value: 'Produção' },
		],
		role: 'Mobile Developer',
		year: '2023',
	},
	{
		title: 'Parabellum Club',
		description:
			'Plataforma full stack desenvolvida com Next.js e Nest.js, utilizando Docker, MongoDB, PostgreSQL e VPS Ubuntu, com integração à AWS Rekognition para reconhecimento facial.',
		image: parabellumImage,
		tags: ['Next.js', 'Nest.js', 'Docker', 'MongoDB', 'PostgreSQL', 'AWS Rekognition'],
		status: 'launched',
		link: 'https://parabellumclub.com.br/',
		tagline: 'Controle de acesso inteligente por reconhecimento facial em tempo real.',
		problem:
			'Um clube de tiro esportivo precisava automatizar o controle de acesso dos sócios mantendo total rastreabilidade e segurança. O desafio era integrar reconhecimento facial em tempo real via AWS Rekognition a um sistema completo de gestão — cadastro, agenda, pagamentos e logs — rodando em infraestrutura própria (VPS Ubuntu) com containers Docker para garantir isolamento e reprodutibilidade.',
		highlights: [
			'Reconhecimento facial na portaria com AWS Rekognition',
			'Gestão completa de sócios, planos e pagamentos',
			'Persistência híbrida: PostgreSQL para dados relacionais + MongoDB para logs',
			'Deploy em VPS Ubuntu com Docker e Nginx como proxy reverso',
			'Painel administrativo com auditoria de acessos em tempo real',
		],
		stack: [
			{ category: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
			{ category: 'Backend', items: ['Nest.js', 'Node.js', 'REST APIs'] },
			{ category: 'Banco de dados', items: ['PostgreSQL', 'MongoDB'] },
			{ category: 'IA & Visão', items: ['AWS Rekognition'] },
			{ category: 'Infraestrutura', items: ['Docker', 'Nginx', 'VPS Ubuntu'] },
		],
		metrics: [
			{ label: 'Reconhecimento', value: 'Tempo real' },
			{ label: 'Deploy', value: 'VPS Ubuntu' },
			{ label: 'Ambiente', value: 'Produção' },
		],
		role: 'Full Stack Developer',
		year: '2024',
	},
	{
		title: 'Cristiano Emp',
		description:
			'Site institucional para um profissional autônomo da construção civil, desenvolvido com Next.js e hospedado na Vercel para garantir performance, credibilidade e contato direto com potenciais clientes.',
		image: cristianoEmpImage,
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
		status: 'in-development',
		link: 'https://cristianoemp.vercel.app/',
		tagline: 'Obras, reformas e acabamentos com a credibilidade de uma marca digital.',
		problem:
			'Profissionais autônomos da construção civil perdem clientes por não terem uma presença online confiável — dependem de WhatsApp, boca a boca ou páginas genéricas em redes sociais. O desafio era entregar um site próprio, moderno e responsivo que transmitisse profissionalismo, apresentasse o portfólio de obras, listasse serviços com clareza e viabilizasse contato direto em um único clique.',
		highlights: [
			'Vitrine de serviços com descrições objetivas (obras, reformas, acabamentos)',
			'Galeria de trabalhos realizados com foco em prova social',
			'Contato direto via WhatsApp em um clique a partir de qualquer seção',
			'Design responsivo otimizado para celular (principal porta de entrada do público)',
			'Deploy contínuo na Vercel com SSL e performance otimizada',
		],
		stack: [
			{ category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
			{ category: 'Deploy', items: ['Vercel', 'Edge Network', 'SSL automático'] },
		],
		metrics: [
			{ label: 'Foco principal', value: 'Mobile-first' },
			{ label: 'Canal de contato', value: 'WhatsApp' },
			{ label: 'Deploy', value: 'Vercel' },
		],
		role: 'Full Stack Developer',
	},
	{
		title: 'Rádio KBum',
		description:
			'Aplicativo mobile para a Rádio KBum, desenvolvido com React Native e Expo para levar transmissão ao vivo, programação e conteúdo da emissora direto pro bolso do ouvinte.',
		image: radioKBumImage,
		tags: ['React Native', 'Expo', 'Streaming', 'Push Notifications'],
		status: 'in-development',
		tagline: 'A Rádio KBum tocando onde você estiver — ao vivo, sem perder um segundo.',
		problem:
			'Rádios tradicionais vêm perdendo audiência para plataformas de streaming e precisam estar onde o público está: no celular. O desafio era entregar um app nativo leve, com player persistente que não interrompe a transmissão mesmo quando o usuário troca de tela, integração com a programação da emissora e canais diretos de interação com o ouvinte.',
		highlights: [
			'Player de streaming ao vivo com controle em background e tela de bloqueio',
			'Programação semanal com destaque para o programa que está no ar',
			'Notificações push para programas favoritos e notícias da emissora',
			'Integração com redes sociais e canal direto de contato com a rádio',
			'Build multiplataforma (iOS + Android) com Expo e atualizações OTA',
		],
		stack: [
			{ category: 'Mobile', items: ['React Native', 'Expo', 'TypeScript'] },
			{ category: 'Áudio', items: ['Streaming ao vivo', 'Background Audio'] },
			{ category: 'Engajamento', items: ['Push Notifications', 'Deep Linking'] },
			{ category: 'Distribuição', items: ['EAS Build', 'OTA Updates'] },
		],
		metrics: [
			{ label: 'Transmissão', value: 'Ao vivo 24/7' },
			{ label: 'Plataformas', value: 'iOS + Android' },
			{ label: 'Atualizações', value: 'OTA' },
		],
		role: 'Mobile Developer',
	},
	{
		title: 'LEAP',
		description:
			'SaaS para criação e distribuição de unidades de aprendizagem voltadas ao ensino superior, com integração nativa a múltiplos LMS via SCORM e LTI.',
		image: leapImage,
		tags: ['SaaS', 'Educação', 'SCORM', 'LTI', 'Next.js', 'TypeScript'],
		status: 'in-development',
		tagline:
			'Conteúdo acadêmico autorado uma vez, publicado em qualquer LMS.',
		problem:
			'Instituições de ensino superior enfrentam um gargalo na produção e distribuição de conteúdo digital: autores precisam dominar padrões técnicos como SCORM e LTI, e cada LMS (Moodle, Canvas, Blackboard, Google Classroom) tem suas próprias peculiaridades de integração. O desafio do LEAP é oferecer um ambiente onde o professor foca em criar a unidade de aprendizagem, e a plataforma cuida de empacotar e entregar o conteúdo em qualquer LMS do mercado, mantendo rastreamento de progresso e avaliações.',
		highlights: [
			'Editor visual de unidades de aprendizagem sem exigir conhecimento técnico',
			'Empacotamento automático nos padrões SCORM 1.2, SCORM 2004 e LTI 1.3',
			'Integração plug-and-play com Moodle, Canvas, Blackboard e outros LMS',
			'Gestão multi-instituição com controle de autores, cursos e permissões',
			'Rastreamento de progresso e notas sincronizado de volta ao LMS de origem',
		],
		stack: [
			{ category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
			{ category: 'Backend', items: ['Node.js', 'Nest.js', 'REST APIs'] },
			{ category: 'Banco de dados', items: ['PostgreSQL', 'Prisma ORM'] },
			{ category: 'Padrões de e-learning', items: ['SCORM 1.2 / 2004', 'LTI 1.3', 'xAPI'] },
			{ category: 'Infraestrutura', items: ['Cloud', 'CDN', 'Multi-tenant'] },
		],
		metrics: [
			{ label: 'Padrões', value: 'SCORM + LTI' },
			{ label: 'Integração', value: 'Multi-LMS' },
			{ label: 'Arquitetura', value: 'Multi-tenant' },
		],
		role: 'Full Stack Developer',
	},
	{
		title: 'SetBox',
		description:
			'Plataforma de apostas peer-to-peer — os usuários apostam entre si, sem "casa" na contraparte. Desenvolvida como SaaS para escalar horizontalmente e suportar múltiplos eventos ao mesmo tempo.',
		image: setboxImage,
		tags: ['SaaS', 'P2P', 'Next.js', 'Nest.js', 'TypeScript', 'Real-time'],
		status: 'launching',
		link: 'http://srv1457316.hstgr.cloud:8081/',
		tagline: 'Aposta direto com outro jogador — sem casa, sem margem oculta.',
		problem:
			'Casas de aposta tradicionais sempre ocupam a contraparte do apostador, o que significa lucro da casa = perda do usuário. O SetBox inverte essa lógica: a plataforma conecta dois jogadores que querem lados opostos de um mesmo mercado e só fica com uma taxa de serviço transparente. O desafio é orquestrar o matching de apostas em tempo real, garantir liquidação automática dos prêmios e manter a experiência simples mesmo com mercados voláteis.',
		highlights: [
			'Mercado peer-to-peer: matching em tempo real entre apostadores',
			'Liquidação automática dos prêmios ao encerramento do evento',
			'Sem "casa" na contraparte — taxa de serviço transparente por aposta',
			'Carteira interna com histórico de apostas, saldo e extratos',
			'Arquitetura escalável preparada para múltiplos eventos simultâneos',
		],
		stack: [
			{ category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
			{ category: 'Backend', items: ['Nest.js', 'Node.js', 'REST APIs', 'WebSockets'] },
			{ category: 'Banco de dados', items: ['PostgreSQL', 'Prisma ORM'] },
			{ category: 'Infraestrutura', items: ['VPS Hostinger', 'Docker', 'Nginx'] },
		],
		metrics: [
			{ label: 'Modelo', value: 'P2P' },
			{ label: 'Matching', value: 'Tempo real' },
			{ label: 'Ambiente', value: 'Staging' },
		],
		role: 'Full Stack Developer',
	},
];

export type Education = {
	degree: string;
	field: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	achievements: string[];
};

export const education: Education[] = [
	{
		degree: 'Bacharelado',
		field: 'Engenharia de Software',
		institution: 'UBM',
		location: 'Cidade, País',
		startDate: '2024',
		endDate: 'Atual',
		achievements: [
			'Lista de Honra da Faculdade (todos os semestres)',
			'Bolsa de Excelência Acadêmica',
			'Prêmio de Projeto Final de Curso',
		],
	},
	{
		degree: 'Ensino Médio',
		field: 'Ciências e Matemática',
		institution: 'Nome da Escola',
		location: 'Cidade, País',
		startDate: 'set. 2016',
		endDate: 'jun. 2020',
		gpa: '4.0/4.0',
		achievements: [
			'Orador da turma',
			'Finalista da Competição Nacional de Matemática',
			'Medalha de Ouro na Feira de Ciências',
		],
	},
];

export type Certificate = {
	title: string;
	issuer: string;
	date: string;
	id?: string;
	url?: string;
	pdf?: string;
};

export const certificates: Certificate[] = [
	{
		title: 'Certificação Profissional em Engenharia',
		issuer: 'Associação Profissional de Engenharia',
		date: 'nov. 2023',
		id: 'CERT-12345',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
	{
		title: 'Especialista em Projeto CAD',
		issuer: 'Autodesk',
		date: 'jun. 2023',
		id: 'CERT-67890',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
	{
		title: 'Fundamentos de Gestão de Projetos',
		issuer: 'Project Management Institute',
		date: 'mar. 2023',
		id: 'CERT-24680',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
];

export type Skill = {
	name: string;
	level: number; // 1-10
	category: 'technical' | 'software' | 'soft' | 'language';
	description?: string;
	highlight?: string;
};

export const skills: Skill[] = [
	// Technical Skills
	{
		name: 'Desenvolvimento Mobile (React Native & Expo)',
		level: 8,
		category: 'technical',
		description: 'Desenvolvimento de aplicações mobile com foco em performance, usabilidade e integração com APIs.',
		highlight: 'Entrega de aplicações mobile integradas a sistemas completos, com backend, banco de dados e autenticação.',
	},
	{
		name: 'Desenvolvimento Completo (Web + Backend)',
		level: 8,
		category: 'technical',
		description: 'Construção de aplicações completas, desde interfaces modernas até APIs escaláveis e seguras.',
		highlight: 'Atuação end-to-end, do protótipo ao deploy em produção.',
	},
	{
		name: 'Arquitetura de Software & APIs',
		level: 7,
		category: 'technical',
		description: 'Estruturação de sistemas backend com REST APIs, organização de código, separação de responsabilidades e boas práticas.',
		highlight: 'Foco em escalabilidade desde o início, mesmo em projetos de pequeno porte.',
	},
	{
		name: 'Modelagem de Banco de Dados (SQL/NoSQL)',
		level: 7,
		category: 'technical',
		description: 'Criação de estruturas eficientes e normalizadas, com foco em performance e escalabilidade.',
		highlight: 'Modelagem orientada ao domínio do negócio, e não apenas à camada técnica.',
	},
	{
		name: 'Integração de Sistemas (APIs, Serviços e IA)',
		level: 7,
		category: 'technical',
		description: 'Integração com serviços externos, como Azure, AWS e APIs REST, incluindo soluções com inteligência artificial.',
		highlight: 'Aplicação prática de IA em cenários reais, como reconhecimento facial e identificação de usuários.',
	},
	{
		name: 'DevOps e Infraestrutura (VPS & Deploy)',
		level: 6,
		category: 'technical',
		description: 'Configuração de ambientes em VPS, uso de Docker, Nginx e práticas básicas de CI/CD.',
		highlight: 'Autonomia para colocar sistemas completos em produção sem dependência de terceiros.',
	},

	// Software Skills
	{ name: 'TypeScript / JavaScript', level: 9, category: 'software' },
	{ name: 'Node.js', level: 8, category: 'software' },
	{ name: 'React Native & Expo', level: 8, category: 'software' },
	{ name: 'Next.js', level: 7, category: 'software' },
	{ name: 'React + Vite', level: 8, category: 'software' },
	{ name: 'Nest.js', level: 7, category: 'software' },
	{ name: 'Prisma ORM', level: 7, category: 'software' },
	{ name: 'REST APIs', level: 8, category: 'software' },
	{ name: 'PostgreSQL', level: 7, category: 'software' },
	{ name: 'MongoDB', level: 7, category: 'software' },
	{ name: 'Redis', level: 6, category: 'software' },
	{ name: 'Docker', level: 6, category: 'software' },
	{ name: 'Nginx', level: 6, category: 'software' },
	{ name: 'VPS (Deploy e Configuração)', level: 7, category: 'software' },
	{ name: 'Integração com APIs de IA (Reconhecimento Facial)', level: 7, category: 'software' },
	{ name: 'SCORM & LTI (Educação Digital)', level: 7, category: 'software' },
	{ name: 'Git & GitHub (Versionamento)', level: 8, category: 'software' },

	// Soft Skills
	{
		name: 'Pensamento Analítico & Resolução de Problemas',
		level: 9,
		category: 'soft',
		description: 'Capacidade de transformar problemas complexos em soluções práticas e funcionais.',
		highlight: 'Forte orientação à entrega e não apenas à teoria.',
	},
	{
		name: 'Adaptabilidade & Resiliência',
		level: 9,
		category: 'soft',
		description: 'Capacidade comprovada de evolução rápida, inclusive em contexto de transição de carreira.',
		highlight: 'Aprendizado acelerado com aplicação prática imediata.',
	},
	{
		name: 'Comunicação & Didática',
		level: 9,
		category: 'soft',
		description: 'Experiência em ensino, condução de grupos e explicação de conceitos técnicos.',
		highlight: 'Consigo traduzir tecnologia para clientes não técnicos com clareza.',
	},
	{
		name: 'Visão de Produto & Negócio',
		level: 8,
		category: 'soft',
		description: 'Capacidade de alinhar desenvolvimento técnico com valor real para o cliente.',
		highlight: 'Penso como desenvolvedor e também como dono do produto.',
	},
	{
		name: 'Trabalho em Equipe & Liderança Técnica',
		level: 8,
		category: 'soft',
		description: 'Atuação colaborativa em times, com organização e foco em entrega.',
		highlight: 'Já atuei tanto em equipe quanto de forma independente, liderando soluções.',
	},
	{
		name: 'Aprendizado Contínuo & Curiosidade Técnica',
		level: 9,
		category: 'soft',
		description: 'Evolução constante com novas tecnologias, IA e boas práticas de desenvolvimento.',
		highlight: 'Exploração ativa de IA como acelerador de produtividade em engenharia de software.',
	},

	// Languages
	{ name: 'Português (Nativo)', level: 10, category: 'language' },
	{ name: 'Inglês Técnico (Leitura e Documentação)', level: 7, category: 'language' },
];

export const strategicDifferentials = [
	'Desenvolvimento de sistemas completos (web, mobile, backend e infraestrutura).',
	'Experiência com cliente real e entrega em produção.',
	'Aplicação prática de Inteligência Artificial em produtos.',
	'Capacidade de atuar como desenvolvedor de ciclo completo, do zero ao deploy.',
	'Experiência com educação e formação de pessoas como professor e instrutor.',
	'Uso de IA como acelerador de produtividade em engenharia de software.',
	'Perfil híbrido: técnico, com visão de negócio e comunicação com o cliente.',
];

export type BlogPost = {
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image: string;
	slug: string;
};

export const blogPosts: BlogPost[] = [
	{
		title: 'Avanços nas Tecnologias de Energia Renovável',
		excerpt: 'Uma análise das inovações mais recentes em energia renovável e de seu impacto no desenvolvimento sustentável.',
		date: '15 mar. 2024',
		author: 'Seu Nome',
		image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
		slug: 'advances-in-renewable-energy',
	},
	{
		title: 'O Futuro da Robótica na Manufatura',
		excerpt: 'Como a robótica e a automação estão transformando a indústria de manufatura e criando novas oportunidades.',
		date: '22 fev. 2024',
		author: 'Seu Nome',
		image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
		slug: 'future-of-robotics-manufacturing',
	},
	{
		title: 'Materiais Sustentáveis na Construção Moderna',
		excerpt: 'Uma análise de materiais de construção ecológicos e de suas aplicações na arquitetura contemporânea.',
		date: '10 jan. 2024',
		author: 'Seu Nome',
		image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
		slug: 'sustainable-building-materials',
	},
];
