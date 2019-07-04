import { Global, css } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

import '@csstools/normalize.css';

const Primary = ({ children }) => (
	<StaticQuery
		query={graphql`
			query SiteMetaQuery {
				contact: markdownRemark(fields: { slug: { eq: "/contact" } }) {
					frontmatter {
						name
					}
				}
			}
		`}
	>
		{data => (
			<>
				<Helmet>
					<meta charSet="utf-8" />

					<title>{`Résumé | ${data.contact.frontmatter.name}`}</title>

					<meta
						name="description"
						content={`Résumé of ${data.contact.frontmatter.name}`}
					/>
				</Helmet>

				<Global
					styles={css`
						body {
							color: #333333;
							font-family: 'Lato', 'Helvetica Neue', Helvetica,
								Arial, sans-serif;
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
		)}
	</StaticQuery>
);

Primary.propTypes = {
	children: PropTypes.node.isRequired
};

export default Primary;
