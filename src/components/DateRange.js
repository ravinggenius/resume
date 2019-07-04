import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import React from 'react';

export const Time = styled.time`
	color: #777777;
`;

const DATE_FORMAT = 'MMMM yyyy';

const DateRange = ({ start, stop }) => {
	const startedOn = DateTime.fromISO(start);
	const stoppedOn = stop ? DateTime.fromISO(stop) : DateTime.utc();

	return (
		<Time dateTime={`${startedOn.toISODate()}/${stoppedOn.toISODate()}`}>
			{startedOn.toFormat(DATE_FORMAT)} &ndash;{' '}
			{stop ? stoppedOn.toFormat(DATE_FORMAT) : 'present'}
		</Time>
	);
};

export default DateRange;
