import React from "react";
import { buildAreaPath, buildFillPath } from "../utils/chart";

function Chart({ values, accent }) {
  const width = 520;
  const height = 240;
  const padding = 24;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const safeRange = max - min || 1;
  const stepX = (width - padding * 2) / Math.max(values.length - 1, 1);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Visitor chart"
      className="chart-svg"
    >
      {[0, 1, 2, 3].map((line) => {
        const y = padding + ((height - padding * 2) / 3) * line;
        return <line key={line} x1={padding} y1={y} x2={width - padding} y2={y} className="chart-grid" />;
      })}

      {values.map((value, index) => {
        const x = padding + index * stepX;
        const y =
          height -
          padding -
          ((value - min) / safeRange) * (height - padding * 2);

        return (
          <g key={`${value}-${index}`}>
            <line x1={x} y1={padding} x2={x} y2={height - padding} className="chart-grid vertical" />
            <circle cx={x} cy={y} r="4" fill={accent} stroke="#ffffff" strokeWidth="2" />
          </g>
        );
      })}

      <path d={buildFillPath(values, width, height, padding)} fill={accent} fillOpacity="0.16" />
      <path d={buildAreaPath(values, width, height, padding)} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default Chart;
