import { DateTime } from 'luxon';
import React from 'react';
import styled from 'react-emotion';

const Time = styled.time`
	display: block;
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
