import React from 'react';

export default ({ data }) => {
	const post = data.markdownRemark;

	return (
		<div>
			<h1>{post.frontmatter.name}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	);
};

export const query = graphql`
	query CompanyQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				name
			}
		}
	}
`;
