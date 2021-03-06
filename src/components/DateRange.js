import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

import { normalizeDate } from '../utilities';

export const Time = styled.time`
	color: #777777;
`;

const DATE_FORMAT = 'MMMM yyyy';

const DateRange = ({ start, stop }) => {
	const startedOn = normalizeDate(start);
	const stoppedOn = normalizeDate(stop);

	return (
		<Time dateTime={`${startedOn.toISODate()}/${stoppedOn.toISODate()}`}>
			{startedOn.toFormat(DATE_FORMAT)} &ndash;{' '}
			{stop ? stoppedOn.toFormat(DATE_FORMAT) : 'present'}
		</Time>
	);
};

DateRange.defaultProps = {
	stop: null
};

DateRange.propTypes = exact({
	start: PropTypes.string.isRequired,
	stop: PropTypes.string
});

export default DateRange;
