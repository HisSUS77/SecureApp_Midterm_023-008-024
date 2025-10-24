/** @type {import('next').NextConfig} */

const nextConfig = {
	async headers() {
		const isProd = process.env.NODE_ENV === 'production';
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "X-XSS-Protection", value: "1; mode=block" },
					{ key: "Referrer-Policy", value: "no-referrer" },
					{
						key: "Content-Security-Policy",
						value: isProd
							? "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none';"
							: "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'none';"
					},
				],
			},
		];
	},
};

export default nextConfig;
