import React from "react";
import StatusBadge from "./StatusBadge";

function RefundOrdersSection({ refunds }) {
  return (
    <section className="module-section">
      <div className="section-heading">
        <div>
          <h3>Refund Orders</h3>
          <p>
            Track refund requests with clear status badges and color-coded decisions across
            the list.
          </p>
        </div>
      </div>

      <div className="module-grid">
        {refunds.map((refund) => (
          <article key={refund.id} className="module-card request-card">
            <div className="request-card-top">
              <strong>{refund.artworkName}</strong>
              <StatusBadge status={refund.status} />
            </div>
            <span className="request-meta">{refund.orderId} • {refund.customerName}</span>
            <p>{refund.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RefundOrdersSection;
