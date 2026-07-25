export function buildAreaPath(values, width, height, padding) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const safeRange = max - min || 1;
  const stepX = (width - padding * 2) / Math.max(values.length - 1, 1);

  return values
    .map((value, index) => {
      const x = padding + index * stepX;
      const y =
        height -
        padding -
        ((value - min) / safeRange) * (height - padding * 2);

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function buildFillPath(values, width, height, padding) {
  const linePath = buildAreaPath(values, width, height, padding);
  const stepX = (width - padding * 2) / Math.max(values.length - 1, 1);
  const lastX = padding + stepX * (values.length - 1);

  return `${linePath} L ${lastX} ${height - padding} L ${padding} ${height - padding} Z`;
}
