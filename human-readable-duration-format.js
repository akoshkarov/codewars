function formatDuration(seconds) {
  const dict = [
    { one: "year", many: "years", divider: 365 * 24 * 60 * 60 * 1 },
    { one: "day", many: "days", divider: 24 * 60 * 60 * 1 },
    { one: "hour", many: "hours", divider: 60 * 60 * 1 },
    { one: "minute", many: "minutes", divider: 60 * 1 },
    { one: "second", many: "seconds", divider: 1 }
  ];

  if (seconds === 0) {
    return "now";
  }
  let result = [];
  for (let i = 0; i < dict.length; i++) {
    if (seconds === 0) {
      break;
    }
    const { one, many, divider } = dict[i];
    const integer = Math.floor(seconds / divider);
    if (integer >= 1 || (integer > 0 && seconds === 1)) {
      if (integer === 1) {
        result.push(`${integer} ${one}`);
      } else {
        result.push(`${integer} ${many}`);
      }
      seconds -= integer * divider;
    }
  }
  const last = result.pop();
  const first = result.join(", ");
  if (result.length === 0) {
    return last;
  }
  return `${first} and ${last}`;
}

// formatDuration(1); // "1 second"
// formatDuration(62); // 1 minute and 2 seconds"
// formatDuration(120); // 2 minutes"
// formatDuration(3600); // 1 hour"
// formatDuration(3662); // 1 hour, 1 minute and 2 seconds"
