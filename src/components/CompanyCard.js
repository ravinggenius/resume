import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

import DateRange, { Time } from './DateRange';
import { markdownExtra } from './Section';

const Company = styled.article`
	display: grid;
	grid-template-areas:
		'facts'
		'summary';

	&:not(:last-of-type) {
		margin-bottom: 1rem;
	}
`;

const Facts = styled.header`
	align-items: baseline;
	display: grid;
	grid-area: facts;
	grid-gap: 1ch;
	grid-template-areas:
		'name'
		'title'
		'date';
	margin-bottom: 0.5rem;

	@media screen and (min-width: 400px) {
		grid-template-areas:
			'name name'
			'title date';
		grid-template-columns: max-content 1fr;
	}

	@media print, screen and (min-width: 550px) {
		grid-template-areas: 'name title date';
		grid-template-columns: max-content max-content 1fr;
	}

	${Time} {
		grid-area: date;

		@media print, screen and (min-width: 400px) {
			justify-self: end;
		}
	}
`;

const Summary = styled.section`
	grid-area: summary;
`;

const Name = styled.h3`
	grid-area: name;
	margin: 0;
`;

const Title = styled.span`
	color: #777777;
	display: block;
	grid-area: title;
`;

const CompanyCard = ({ name, startedAt, stoppedAt, summary, title }) => (
	<Company>
		<Facts>
			<Name>{name}</Name>

			<Title>{title}</Title>

			<DateRange start={startedAt} stop={stoppedAt} />
		</Facts>

		<Summary
			css={markdownExtra}
			dangerouslySetInnerHTML={{ __html: summary }}
		/>
	</Company>
);

CompanyCard.defaultProps = {
	stoppedAt: null
};

CompanyCard.propTypes = exact({
	name: PropTypes.string.isRequired,
	startedAt: PropTypes.string.isRequired,
	stoppedAt: PropTypes.string,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
});

export default CompanyCard;
