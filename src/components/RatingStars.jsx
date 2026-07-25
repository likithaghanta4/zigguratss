import React from "react";

function RatingStars({ rating }) {
  return (
    <div className="rating-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "filled" : ""}>
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
