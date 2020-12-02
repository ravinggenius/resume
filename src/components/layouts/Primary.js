import { Global, css } from '@emotion/core';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';
import { Helmet } from 'react-helmet';

import '@csstools/normalize.css';

const Primary = ({ children, title }) => (
	<>
		<Helmet>
			<meta charSet="utf-8" />

			<title>{title}</title>
		</Helmet>

		<Global
			styles={css`
				body {
					color: #333333;
					font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial,
						sans-serif;
					margin-left: auto;
					margin-right: auto;
					max-width: 8in;

					@media print {
						max-width: 7in;
					}
				}

				a {
					color: #337ab7;
					text-decoration: none;

					&:focus,
					&:hover {
						color: #23527c;
						text-decoration: underline;
					}
				}

				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					font-weight: 500;
					margin: 0;
				}

				@media screen {
					main {
						margin: 1em;
					}
				}

				p {
					margin: 0;
				}
			`}
		/>

		<main role="main">{children}</main>
	</>
);

Primary.propTypes = exact({
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
});

export default Primary;
