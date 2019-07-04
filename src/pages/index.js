import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

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
import { weighByExperience } from '../utilities';

const IndexPage = () => (
	<StaticQuery
		query={graphql`
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
		`}
	>
		{data => (
			<Primary>
				<ContactCard {...data.contact.frontmatter} />

				<SectionLayout>
					<Header>
						<Title>Profile</Title>
					</Header>

					<Body
						css={markdownExtra}
						dangerouslySetInnerHTML={{
							__html: data.contact.profile
						}}
					/>
				</SectionLayout>

				<Section title="Skills/Tools">
					<WeightedKeywordList
						keywords={weighByExperience(
							data.companies.edges.map(({ node }) => ({
								keywords: node.frontmatter.keywords,
								startedAt: node.frontmatter.startedAt.split(
									'T'
								)[0],
								stoppedAt: node.frontmatter.stoppedAt
									? node.frontmatter.stoppedAt.split('T')[0]
									: null
							}))
						)}
					/>
				</Section>

				<Section title="Experience">
					{data.companies.edges.map(({ node }) => (
						<CompanyCard
							key={node.fields.slug}
							name={node.frontmatter.name}
							startedAt={node.frontmatter.startedAt}
							stoppedAt={node.frontmatter.stoppedAt}
							summary={node.summary}
							title={node.frontmatter.title}
						/>
					))}
				</Section>
			</Primary>
		)}
	</StaticQuery>
);

export default IndexPage;
