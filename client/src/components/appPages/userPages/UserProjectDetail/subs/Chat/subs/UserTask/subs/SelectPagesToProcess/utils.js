export const parsePages = (input) => {
  const result = new Set();
  const items = input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  for (const item of items) {
    if (/^\d+$/.test(item)) {
      result.add(Number(item));
    } else if (/^\d+-\d+$/.test(item)) {
      const [start, end] = item.split("-").map(Number);
      if (start <= end) {
        for (let i = start; i <= end; i++) {
          result.add(i);
        }
      }
    }
  }
  return Array.from(result).sort((a, b) => a - b);
};
