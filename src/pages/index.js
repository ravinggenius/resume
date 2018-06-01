import React from 'react';

import ContactCard from '../components/contact_card';
import CompanyCard from '../components/company_card';
import Section, {
	Body,
	Header,
	SectionLayout,
	Title
} from '../components/section';
import WeightedKeywordList from '../components/weighted_keyword_list';
import { weighByExperience } from '../utilities';

const IndexPage = ({ data }) => (
	<main role="main">
		<ContactCard {...data.contact.frontmatter} />

		<SectionLayout>
			<Header>
				<Title>Profile</Title>
			</Header>

			<Body dangerouslySetInnerHTML={{ __html: data.contact.profile }} />
		</SectionLayout>

		<Section title="Skills/Tools">
			<WeightedKeywordList
				keywords={weighByExperience(
					data.companies.edges.map(({ node }) => ({
						keywords: node.frontmatter.keywords,
						startedAt: node.frontmatter.startedAt.split('T')[0],
						stoppedAt: node.frontmatter.stoppedAt.split('T')[0]
					}))
				)}
			/>
		</Section>

		<Section title="Experience">
			{data.companies.edges.map(({ node }) => (
				<CompanyCard
					key={node.fields.slug}
					{...node.frontmatter}
					summary={node.summary}
				/>
			))}
		</Section>
	</main>
);

export default IndexPage;

export const query = graphql`
	query IndexQuery {
		companies: allMarkdownRemark(
			filter: { frontmatter: { isPublished: { eq: true } } }
			sort: { fields: [frontmatter___startedAt], order: DESC }
		) {
			edges {
				node {
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
