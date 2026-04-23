/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: false,
	images: { unoptimized: true },
	webpack: (config, { isServer }) => {
		config.cache = false;
		return config;
	},
};

module.exports = nextConfig;
