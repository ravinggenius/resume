const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

module.exports.onCreateNode = ({ actions, getNode, node }) => {
	const { createNodeField } = actions;

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
