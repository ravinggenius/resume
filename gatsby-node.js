const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

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
