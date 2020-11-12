import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import ContactCard from '../components/ContactCard';
import CompanyCard from '../components/CompanyCard';
import Section, {
	Body,
	Header,
	SectionLayout,
	Title,
	markdownExtra
} from '../components/Section';
import WeightedKeywordList from '../components/WeightedKeywordList';
import Primary from '../components/layouts/Primary';
import { calculatePropminenceFor, weighByExperience } from '../utilities';

const MIN_PROMINENCE_THRESHOLD = 3;

const IndexPage = ({
	data: {
		companies: { nodes: companies },
		contact
	}
}) => {
	const keywords = weighByExperience(
		companies.map(({ frontmatter }) => ({
			keywords: frontmatter.keywords,
			startedAt: frontmatter.startedAt,
			stoppedAt: frontmatter.stoppedAt
		}))
	);

	const prominenceFor = calculatePropminenceFor(keywords);

	const keywordsWithProminence = keywords.map(
		({ lastUsed, weight, ...keyword }) => ({
			lastUsed,
			weight,
			prominence: prominenceFor(lastUsed, weight),
			...keyword
		})
	);

	const mostProminentKeywords = keywordsWithProminence.filter(
		({ prominence }) => prominence >= MIN_PROMINENCE_THRESHOLD
	);

	return (
		<Primary title={`Résumé | ${contact.frontmatter.name}`}>
			<Helmet>
				<meta
					name="description"
					content={`Résumé of ${contact.frontmatter.name}`}
				/>

				<meta
					name="keywords"
					content={mostProminentKeywords
						.map(({ keyword }) => keyword)
						.join(', ')}
				/>
			</Helmet>

			<ContactCard {...contact.frontmatter} />

			<SectionLayout>
				<Header>
					<Title>Profile</Title>
				</Header>

				<Body
					css={markdownExtra}
					dangerouslySetInnerHTML={{
						__html: contact.profile
					}}
				/>
			</SectionLayout>

			<Section title="Skills/Tools">
				<WeightedKeywordList {...{ keywords }} />
			</Section>

			<Section title="Experience">
				{companies.map(({ fields, frontmatter, summary }) => (
					<CompanyCard
						{...{ summary }}
						key={fields.slug}
						name={frontmatter.name}
						startedAt={frontmatter.startedAt}
						stoppedAt={frontmatter.stoppedAt}
						title={frontmatter.title}
					/>
				))}
			</Section>
		</Primary>
	);
};

export default IndexPage;

export const query = graphql`
	query IndexQuery {
		companies: allMarkdownRemark(
			filter: { frontmatter: { isPublished: { eq: true } } }
			sort: { fields: [frontmatter___startedAt], order: DESC }
		) {
			nodes {
				fields {
					slug
				}
				frontmatter {
					keywords
					name
					startedAt
					stoppedAt
					title
				}
				summary: html
			}
		}

		contact: markdownRemark(fields: { slug: { eq: "/contact" } }) {
			frontmatter {
				name
				email
				location
				phone
				title
				website
			}
			profile: html
		}
	}
`;
