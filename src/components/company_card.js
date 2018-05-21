import Link from 'gatsby-link';
import React from 'react';
import styled from 'react-emotion';

const Company = styled.article`
	display: grid;
	grid-gap: 3px;
	grid-template-areas: 'facts story';
	grid-template-columns: 1fr 1fr;
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
	slug,
	startedAt,
	stoppedAt,
	summary
}) => (
	<Company>
		<section>
			<h3>
				<Link to={slug}>{name}</Link>
			</h3>

			<KeywordList>
				{keywords.map(word => <Keyword key={word}>{word}</Keyword>)}
			</KeywordList>
		</section>

		<section>
			<p>{summary}</p>
		</section>
	</Company>
);
