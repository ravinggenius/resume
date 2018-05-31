import React from 'react';
import styled from 'react-emotion';

export const SectionLayout = styled.section`
	display: grid;
	grid-gap: 2ch;
	grid-template-areas: 'header body';
	grid-template-columns: 2fr 9fr;

	&:not(:last-of-type) {
		margin-bottom: 2rem;
	}
`;

export const Header = styled.header`
	grid-area: header;
`;

export const Title = styled.h2`
	text-align: right;
`;

export const Body = styled.section`
	grid-area: body;
`;

export default ({ children, title }) => (
	<SectionLayout>
		<Header>
			<Title>{title}</Title>
		</Header>

		<Body>{children}</Body>
	</SectionLayout>
);
