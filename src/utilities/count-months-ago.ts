import { differenceInCalendarMonths } from "date-fns";

export const countMonthsAgo = (lastUsed: Date) =>
	differenceInCalendarMonths(new Date(), lastUsed);
