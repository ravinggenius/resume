import React from 'react';
import styled, { css } from 'react-emotion';

export const SectionLayout = styled.section`
	display: grid;
	grid-gap: 2ch;
	grid-template-areas:
		'header'
		'body';

	@media print, screen and (min-width: 600px) {
		grid-template-areas: 'header body';
		grid-template-columns: auto 1fr;
	}

	@media screen and (min-width: 780px) {
		grid-template-columns: 2fr 9fr;
	}

	&:not(:last-of-type) {
		margin-bottom: 2rem;
	}
`;

export const Header = styled.header`
	grid-area: header;

	@media print, screen and (min-width: 600px) AND (max-width: 779px) {
		writing-mode: vertical-rl;
	}
`;

export const Title = styled.h2`
	@media screen and (min-width: 780px) {
		text-align: right;
	}
`;

export const Body = styled.section`
	grid-area: body;
`;

export const markdownExtra = css`
	@media print {
		a::before {
			content: '[';
		}

		a::after {
			content: '](' attr(href) ')';
		}
	}
`;

export default ({ children, title }) => (
	<SectionLayout>
		<Header>
			<Title>{title}</Title>
		</Header>

		<Body>{children}</Body>
	</SectionLayout>
);
