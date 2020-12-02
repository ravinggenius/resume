import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

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

const Section = ({ children, title }) => (
	<SectionLayout>
		<Header>
			<Title>{title}</Title>
		</Header>

		<Body>{children}</Body>
	</SectionLayout>
);

Section.propTypes = exact({
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
});

export default Section;
