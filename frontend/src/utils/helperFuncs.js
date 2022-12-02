import { formatDistanceToNowStrict, format } from "date-fns";

export const formatDateAgo = (date) => {
  console.log("Date", date); // need to check why this helper function gets called multiple times
  if (date !== undefined) {
    return formatDistanceToNowStrict(new Date(date));
  }
  else {
    return;
  }
};

export const formatDayTime = (date) => {
  if (date !== undefined) {
    return format(new Date(date), "MMM d', ' yy 'at' H':'mm");
  }
  else {
    return;
  }
};

