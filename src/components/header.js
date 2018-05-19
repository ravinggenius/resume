import Link from 'gatsby-link';
import React from 'react';
import styled from 'react-emotion';

const StyledLink = styled(Link)`
	color: white;
	text-decoration: none;
`;

const Header = ({ siteTitle }) => (
	<div
		style={{
			background: 'rebeccapurple',
			marginBottom: '1.45rem'
		}}
	>
		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '1.45rem 1.0875rem'
			}}
		>
			<h1 style={{ margin: 0 }}>
				<StyledLink to="/">{siteTitle}</StyledLink>
			</h1>
		</div>
	</div>
);

export default Header;
