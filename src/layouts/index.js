import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import 'normalize.css';

import './index.css';

const Layout = ({ children, data }) => (
	<div>
		<Helmet
			meta={[
				{
					name: 'description',
					content: `Résumé of ${data.contact.frontmatter.name}`
				}
			]}
			title={`Résumé | ${data.contact.frontmatter.name}`}
		/>

		{children()}
	</div>
);

Layout.propTypes = {
	children: PropTypes.func.isRequired
};

export default Layout;

export const query = graphql`
	query SiteMetaQuery {
		contact: markdownRemark(fields: { slug: { eq: "/contact" } }) {
			frontmatter {
				name
			}
		}
	}
`;
