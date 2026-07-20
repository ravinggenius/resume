import { parseISO } from "date-fns";

export const normalizeDate = (dateTime?: string) =>
	dateTime ? parseISO(dateTime.split("T")[0]) : new Date();
