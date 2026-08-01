import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const profiles = defineCollection({
	loader: glob({ base: "./src/data/profiles", pattern: "*.json" }),
	schema: z.object({
		name: z.string().nonempty(),
		label: z.string().nonempty(),
		email: z.email(),
		phone: z.string().nonempty(),
		url: z.url(),
		summary: z.string().nonempty(),
		location: z.object({
			city: z.string().nonempty(),
			countryCode: z.string().nonempty(),
			region: z.string().nonempty()
		}),
		profiles: z
			.array(
				z.object({
					network: z.string().nonempty(),
					username: z.string().nonempty(),
					url: z.union([z.url(), z.string().nonempty()])
				})
			)
			.nonempty()
	})
});

const educations = defineCollection({
	loader: glob({ base: "./src/data/educations", pattern: "*.json" }),
	schema: z.object({
		institution: z.string().nonempty(),
		url: z.url().optional(),
		area: z.string().nonempty(),
		studyType: z.string().nonempty().optional(),
		startDate: z.iso.date(),
		endDate: z.iso.date().optional(),
		details: z.string().nonempty()
	})
});

const interests = defineCollection({
	loader: glob({ base: "./src/data/interests", pattern: "*.json" }),
	schema: z.object({
		name: z.string().nonempty(),
		keywords: z.array(z.string().nonempty()).nonempty()
	})
});

const languages = defineCollection({
	loader: glob({ base: "./src/data/languages", pattern: "*.json" }),
	schema: z.object({
		language: z.string().nonempty(),
		fluency: z.string().nonempty()
	})
});

const projects = defineCollection({
	loader: glob({ base: "./src/data/projects", pattern: "*.json" }),
	schema: z.object({
		name: z.string().nonempty(),
		type: z.string().nonempty(),
		url: z.url().optional()
	})
});

const references = defineCollection({
	loader: glob({ base: "./src/data/references", pattern: "*.json" }),
	schema: z.object({
		name: z.string().nonempty()
	})
});

const skills = defineCollection({
	loader: glob({ base: "./src/data/skills", pattern: "*.json" }),
	schema: z.object({
		family: z.string().nonempty(),
		tags: z
			.array(
				z.object({
					name: z.string().nonempty(),
					proficiency: z.union([
						z.literal(1),
						z.literal(2),
						z.literal(3),
						z.literal(4),
						z.literal(5)
					])
				})
			)
			.min(1)
	})
});

const testimonials = defineCollection({
	loader: glob({ base: "./src/data/testimonials", pattern: "*.json" }),
	schema: z.object({
		media: z.enum(["all", "print", "screen"]).optional().default("all"),
		name: z.string().nonempty(),
		position: z.string().nonempty(),
		company: z.string().nonempty(),
		quote: z.string().nonempty()
	})
});

const workExperiences = defineCollection({
	loader: glob({ base: "./src/data/work-experiences", pattern: "*.json" }),
	schema: z.object({
		media: z.enum(["all", "print", "screen"]).optional().default("all"),
		name: z.string().nonempty(),
		position: z.string().nonempty(),
		startDate: z.iso.date(),
		endDate: z.iso.date().optional(),
		summary: z.string().nonempty(),
		highlights: z.array(z.string().nonempty()).optional().default([])
	})
});

export const collections = {
	profiles,
	educations,
	interests,
	languages,
	projects,
	references,
	skills,
	testimonials,
	workExperiences
};
