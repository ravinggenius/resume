require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	plugins: [
		'gatsby-plugin-emotion',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: process.env.GOOGLE_ANALYTICS_ID,
				anonymize: true,
				head: true,
				respectDNT: true
			}
		},
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/src/data`
			}
		},
		'gatsby-transformer-remark'
	]
};
