import React from "react";
import RatingStars from "./RatingStars";

function RemarkViewSection({ remarks }) {
  return (
    <section className="module-section">
      <div className="section-heading">
        <div>
          <h3>Remark View</h3>
          <p>
            Read curator and collector feedback in a more visual card layout with quick
            star-based sentiment.
          </p>
        </div>
      </div>

      <div className="module-grid">
        {remarks.map((remark) => (
          <article key={remark.id} className="module-card remark-card">
            <span className="request-meta">{remark.author}</span>
            <strong>{remark.title}</strong>
            <RatingStars rating={remark.rating} />
            <p>{remark.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RemarkViewSection;
