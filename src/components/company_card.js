import React from 'react';
import styled from 'react-emotion';

import DateRange from '../components/date_range';

const Company = styled.article`
	display: grid;
	grid-gap: 3px;
	grid-template-areas: 'facts summary';
	grid-template-columns: 1fr 1fr;
	margin: 0.5em 0;
`;

const Facts = styled.header`
	grid-area: facts;
`;

const Summary = styled.section`
	grid-area: summary;
`;

const Name = styled.h3`
	margin: 0;
`;

const Title = styled.span`
	display: block;
`;

const KeywordList = styled.p`
	display: flex;
	flex-wrap: wrap;
`;

const Keyword = styled.span`
	display: inline-block;
	margin: 2px 3px;

	&:first-of-type {
		margin-left: 0;
	}

	&:last-of-type {
		margin-right: 0;
	}
`;

export default ({
	keywords,
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

			<KeywordList>
				{keywords.map(word => <Keyword key={word}>{word}</Keyword>)}
			</KeywordList>
		</Facts>

		<Summary dangerouslySetInnerHTML={{ __html: summary }} />
	</Company>
);
