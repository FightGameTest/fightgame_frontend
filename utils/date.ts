const monthWord = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertToDate(unix_timestamp) {
  var date = new Date(unix_timestamp);

  const monthWord = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthWord[date.getMonth()+1];
  const year = date.getFullYear();

  var formattedTime = `${day} ${month} ${year}`;
  return formattedTime;
}