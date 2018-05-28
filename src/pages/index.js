import React from 'react';

import ContactCard from '../components/contact_card';
import CompanyCard from '../components/company_card';
import WeightedKeywordList from '../components/weighted_keyword_list';
import { weighByExperience } from '../utilities';

const IndexPage = ({ data }) => (
	<main role="main">
		<ContactCard {...data.contactToml} />

		<WeightedKeywordList
			keywords={weighByExperience(
				data.allMarkdownRemark.edges.map(({ node }) => ({
					keywords: node.frontmatter.keywords,
					startedAt: node.frontmatter.startedAt.split('T')[0],
					stoppedAt: node.frontmatter.stoppedAt.split('T')[0]
				}))
			)}
		/>

		<section>
			{data.allMarkdownRemark.edges.map(({ node }) => (
				<CompanyCard
					key={node.fields.slug}
					{...node.frontmatter}
					summary={node.summary}
				/>
			))}
		</section>
	</main>
);

export default IndexPage;

export const query = graphql`
	query IndexQuery {
		allMarkdownRemark(
			filter: { frontmatter: { isPublished: { eq: true } } }
			sort: { fields: [frontmatter___startedAt], order: DESC }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						name
						startedAt
						stoppedAt
						salaryInCents
						salaryPeriod
						startedAt
						stoppedAt
						title
						keywords
					}
					summary: html
				}
			}
		}

		contactToml {
			name
			phone
			email
			location
		}
	}
`;
