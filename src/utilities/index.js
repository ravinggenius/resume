import { DateTime } from 'luxon';

export const calculateColorFor = keywords => {
	const ages = keywords.map(({ lastUsed }) => lastUsed);

	const leastRecent = ages.reduce((memo, age) => (memo < age ? memo : age));
	const mostRecent = ages.reduce((memo, age) => (memo > age ? memo : age));

	const scaleColor = scale(
		countMonthsAgo(mostRecent),
		countMonthsAgo(leastRecent),
		25,
		65
	);

	return lastUsed =>
		`hsl(0deg, 0%, ${Math.round(scaleColor(countMonthsAgo(lastUsed)))}%)`;
};

export const calculateFontSizeFor = keywords => {
	const weights = keywords.map(({ weight }) => weight);

	const lightest = Math.min(...weights);
	const heaviest = Math.max(...weights);

	const scaleFontSize = scale(lightest, heaviest, 12, 20);

	return weight => `${Math.round(scaleFontSize(weight))}px`;
};

export const countMonthsAgo = lastUsed =>
	DateTime.utc()
		.diff(lastUsed, 'months')
		.toObject().months;

export const scale = (fromMin, fromMax, toMin = 0, toMax = 100) => number => {
	return ((toMax - toMin) * (number - fromMin)) / (fromMax - fromMin) + toMin;
};

export const weighByExperience = items => {
	return items
		.map(({ keywords, startedAt, stoppedAt }) => {
			const lastUsed = DateTime.fromISO(stoppedAt);

			return keywords.map(keyword => ({
				keyword,
				duration: lastUsed.diff(DateTime.fromISO(startedAt), 'months'),
				lastUsed
			}));
		})
		.reduce((memo, keywords) => memo.concat(keywords))
		.reduce((memo, keyword) => {
			const needle = memo.find(
				straw => straw.keyword === keyword.keyword
			);

			if (needle) {
				return memo
					.filter(straw => straw.keyword !== keyword.keyword)
					.concat({
						keyword: keyword.keyword,
						lastUsed:
							keyword.lastUsed > needle.lastUsed
								? keyword.lastUsed
								: needle.lastUsed,
						weight:
							keyword.duration.toObject().months + needle.weight
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
};
