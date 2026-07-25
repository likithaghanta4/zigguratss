import React from "react";

function StatusBadge({ status }) {
  const tone = status.toLowerCase().replace(/\s+/g, "-");

  return <span className={`status-badge ${tone}`}>{status}</span>;
}

export default StatusBadge;
