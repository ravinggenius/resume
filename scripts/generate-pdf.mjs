// @ts-check

import { existsSync } from "node:fs";

import { createServer } from "http-server";
import { chromium } from "playwright";

if (!existsSync("./dist/pdf/index.html")) {
	console.error(
		"dist/pdf/index.html not found — run `astro build` before generate-pdf.mjs"
	);

	process.exit(1);
}

const server = createServer({ root: "./dist" });

server.listen(4321);

const browser = await chromium.launch();

const page = await browser.newPage();
await page.goto("http://localhost:4321/pdf");
await page.pdf({
	path: "dist/ingram-resume.pdf"
});

await browser.close();

server.close();
