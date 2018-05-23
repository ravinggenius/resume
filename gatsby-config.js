module.exports = {
	plugins: [
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/src/data`
			}
		},
		'gatsby-transformer-remark',
		'gatsby-transformer-toml'
	],

	siteMetadata: {
		title: 'Thomas Ingram'
	}
};
