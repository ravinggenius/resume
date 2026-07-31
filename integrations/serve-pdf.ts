import { createReadStream, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";

export default function servePdf({ filename }: { filename: string }) {
	return {
		name: "serve-pdf",
		hooks: {
			"astro:server:setup": ({ server }) => {
				server.middlewares.use((req, res, next) => {
					if (req.url !== `/${filename}`) {
						return next();
					}

					const pdfPath = fileURLToPath(
						new URL(`../dist/${filename}`, import.meta.url)
					);

					if (!existsSync(pdfPath)) {
						return next();
					}

					res.setHeader("Content-Type", "application/pdf");
					createReadStream(pdfPath).pipe(res);
				});
			}
		}
	} satisfies AstroIntegration;
}
