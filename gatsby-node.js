const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

module.exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	return graphql(`
		{
			allMarkdownRemark(
				filter: { frontmatter: { isPublished: { eq: true } } }
			) {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {
		result.data.allMarkdownRemark.edges.map(({ node }) => {
			createPage({
				component: path.resolve('./src/templates/company.js'),
				context: {
					slug: node.fields.slug
				},
				path: node.fields.slug
			});
		});
	});
};

module.exports.onCreateNode = ({ boundActionCreators, getNode, node }) => {
	const { createNodeField } = boundActionCreators;

	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({
			getNode,
			node,
			trailingSlash: false
		});

		createNodeField({
			name: 'slug',
			node,
			value: slug
		});
	}
};
