export const calculateScore = (format, marks) => {
  switch (format) {
    case "no-points":
      return 0;

    case "standard":
    default: {
      return [20, 19, 18, 17, 16, 15, 25].reduce((mem, segmentValue, segment) => {
        return mem + Math.max(0, marks[segment] - 3) * segmentValue;
      }, 0);
    }
  }
};
