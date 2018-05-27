import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import 'normalize.css';

const Layout = ({ children, data }) => (
	<div>
		<Helmet
			meta={[
				{ name: 'description', content: 'Sample' },
				{ name: 'keywords', content: 'sample, something' }
			]}
			title={data.site.siteMetadata.title}
		/>

		{children()}
	</div>
);

Layout.propTypes = {
	children: PropTypes.func.isRequired
};

export default Layout;

export const query = graphql`
	query SiteTitleQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
