import React from "react";

function DonutMeter({ value }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 160 160" className="donut-chart" aria-hidden="true">
        <circle cx="80" cy="80" r={radius} className="donut-track" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          className="donut-value"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
      <div className="donut-copy">
        <strong>{value}%</strong>
      </div>
    </div>
  );
}

export default DonutMeter;
