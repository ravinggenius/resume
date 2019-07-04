import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
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

WeightedKeywordList.propTypes = exact({
	keywords: PropTypes.arrayOf(
		PropTypes.shape({
			keyword: PropTypes.string.isRequired,
			lastUsed: PropTypes.shape({}).isRequired,
			weight: PropTypes.number.isRequired
		})
	).isRequired
});

export default WeightedKeywordList;
