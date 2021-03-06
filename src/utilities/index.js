import { DateTime } from 'luxon';

export const calculateColorFor = (keywords) => {
	const ages = keywords.map(({ lastUsed }) => lastUsed);

	const leastRecent = ages.reduce((memo, age) => (memo < age ? memo : age));
	const mostRecent = ages.reduce((memo, age) => (memo > age ? memo : age));

	const scaleColor = scale(
		countMonthsAgo(mostRecent),
		countMonthsAgo(leastRecent),
		25,
		65
	);

	return (lastUsed) =>
		`hsl(0deg, 0%, ${Math.round(scaleColor(countMonthsAgo(lastUsed)))}%)`;
};

export const calculateFontSizeFor = (keywords) => {
	const weights = keywords.map(({ weight }) => weight);

	const lightest = Math.min(...weights);
	const heaviest = Math.max(...weights);

	const scaleFontSize = scale(lightest, heaviest, 12, 20);

	return (weight) => `${Math.round(scaleFontSize(weight))}px`;
};

export const calculatePropminenceFor = (keywords) => {
	const ages = keywords.map(({ lastUsed }) => lastUsed);
	const weights = keywords.map(({ weight }) => weight);

	const leastRecent = ages.reduce((memo, age) => (memo < age ? memo : age));
	const mostRecent = ages.reduce((memo, age) => (memo > age ? memo : age));

	const lightest = Math.min(...weights);
	const heaviest = Math.max(...weights);

	const scaleAge = scale(
		-countMonthsAgo(leastRecent),
		-countMonthsAgo(mostRecent),
		0,
		2
	);

	const scaleWeight = scale(lightest, heaviest, 0, 2);

	return (lastUsed, weight) =>
		Math.round(scaleAge(-countMonthsAgo(lastUsed)) + scaleWeight(weight));
};

export const countMonthsAgo = (lastUsed) =>
	DateTime.utc().diff(lastUsed, 'months').toObject().months;

export const normalizeDate = (dateTime) =>
	dateTime ? DateTime.fromISO(dateTime.split('T')[0]) : DateTime.utc();

export const scale = (fromMin, fromMax, toMin = 0, toMax = 100) => (number) =>
	((toMax - toMin) * (number - fromMin)) / (fromMax - fromMin) + toMin;

export const weighByExperience = (items) =>
	items
		.map(({ keywords, startedAt, stoppedAt }) => {
			const lastUsed = normalizeDate(stoppedAt);

			return keywords.map((keyword) => ({
				keyword,
				duration: lastUsed.diff(normalizeDate(startedAt), 'months'),
				lastUsed
			}));
		})
		.reduce((memo, keywords) => memo.concat(keywords))
		.reduce((memo, keyword) => {
			const needle = memo.find(
				(straw) => straw.keyword === keyword.keyword
			);

			if (needle) {
				return memo
					.filter((straw) => straw.keyword !== keyword.keyword)
					.concat({
						keyword: keyword.keyword,
						lastUsed:
							keyword.lastUsed > needle.lastUsed
								? keyword.lastUsed
								: needle.lastUsed,
						weight:
							needle.weight + keyword.duration.toObject().months
					});
			} else {
				return memo.concat({
					keyword: keyword.keyword,
					lastUsed: keyword.lastUsed,
					weight: keyword.duration.toObject().months
				});
			}
		}, [])
		.sort((a, b) =>
			a.keyword.toLowerCase().localeCompare(b.keyword.toLowerCase())
		);
