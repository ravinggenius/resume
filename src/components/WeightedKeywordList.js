import styled from '@emotion/styled';
import React from 'react';

import { calculateColorFor, calculateFontSizeFor } from '../utilities';

const Keyword = styled.span`
	display: inline-block;
	margin: 0 0.75ch;
`;

const KeywordList = styled.p`
	margin-left: -0.75ch;
`;

const WeightedKeywordList = ({ keywords }) => {
	const colorFor = calculateColorFor(keywords);
	const fontSizeFor = calculateFontSizeFor(keywords);

	return (
		<KeywordList>
			{keywords.map(({ keyword, lastUsed, weight }) => (
				<Keyword
					css={{
						color: colorFor(lastUsed),
						fontSize: fontSizeFor(weight)
					}}
					key={keyword}
				>
					{keyword}
				</Keyword>
			))}
		</KeywordList>
	);
};

export default WeightedKeywordList;
