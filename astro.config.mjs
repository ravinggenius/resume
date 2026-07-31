// @ts-check

import { defineConfig } from "astro/config";

import servePdf from "./integrations/serve-pdf";

// https://astro.build/config
export default defineConfig({
	integrations: [
		servePdf({
			filename: "ingram-resume.pdf"
		})
	]
});
