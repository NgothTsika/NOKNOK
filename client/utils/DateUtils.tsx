export const formatISOCustom = (isoString: string) => {
  const date = new Date(isoString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const day = date.getUTCDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day} ${month}, ${year}`;
};
