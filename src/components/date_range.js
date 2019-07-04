import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import React from 'react';

export const Time = styled.time`
	color: #777777;
`;

const DATE_FORMAT = 'MMMM yyyy';

export default ({ start, stop }) => {
	const startedOn = DateTime.fromISO(start);
	const stoppedOn = DateTime.fromISO(stop);

	return (
		<Time dateTime={`${startedOn.toISODate()}/${stoppedOn.toISODate()}`}>
			{startedOn.toFormat(DATE_FORMAT)} &ndash;{' '}
			{stoppedOn.toFormat(DATE_FORMAT)}
		</Time>
	);
};
