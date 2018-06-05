import React from 'react';
import styled from 'react-emotion';

import DateRange, { Time } from '../components/date_range';
import { markdownExtra } from '../components/section';

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

export default ({
	name,
	salary,
	salaryPeriod,
	startedAt,
	stoppedAt,
	summary,
	title
}) => (
	<Company>
		<Facts>
			<Name>{name}</Name>

			<Title>{title}</Title>

			<DateRange
				start={startedAt.split('T')[0]}
				stop={stoppedAt.split('T')[0]}
			/>
		</Facts>

		<Summary
			className={markdownExtra}
			dangerouslySetInnerHTML={{ __html: summary }}
		/>
	</Company>
);
