import Link from 'gatsby-link';
import React from 'react';

import ContactCard from '../components/contact_card';
import CompanyCard from '../components/company_card';

const IndexPage = ({ data }) => (
	<main role="main">
		<ContactCard {...data.contactToml} />

		<section>
			{data.allMarkdownRemark.edges.map(({ node }) => (
				<CompanyCard
					key={node.fields.slug}
					{...node.fields}
					{...node.frontmatter}
				/>
			))}
		</section>
	</main>
);

export default IndexPage;

export const query = graphql`
	query IndexQuery {
		allMarkdownRemark(
			sort: { fields: [frontmatter___startedAt], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						name
						startedAt
						stoppedAt
						salaryInCents
						salaryPeriod
						keywords
						summary
					}
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
