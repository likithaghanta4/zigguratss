import React, { useState } from "react";
import { formatCurrency } from "../utils/format";

function OrderOfferEnquirySection({ offers }) {
  const [dateFilter, setDateFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const now = new Date("2026-04-22");

  const filteredOffers = [...offers]
    .filter((offer) => {
      const offerDate = new Date(offer.date);

      if (dateFilter === "today") {
        return offer.date === "2026-04-22";
      }

      if (dateFilter === "week") {
        return (now - offerDate) / (1000 * 60 * 60 * 24) <= 7;
      }

      return true;
    })
    .sort((a, b) => {
      if (priceFilter === "low-high") {
        return a.offerPrice - b.offerPrice;
      }

      if (priceFilter === "high-low") {
        return b.offerPrice - a.offerPrice;
      }

      return 0;
    });

  return (
    <section className="module-section">
      <div className="section-heading section-heading-spread">
        <div>
          <h3>Order Offer Enquiry</h3>
          <p>
            Review incoming offers, filter them quickly, and spot newly arrived interest at
            a glance.
          </p>
        </div>

        <div className="filter-row">
          <select className="range-select" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
          </select>

          <select className="range-select" value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
            <option value="all">Default Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Artwork Name</th>
              <th>Customer Name</th>
              <th>Offer Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.map((offer) => (
              <tr key={offer.id} className={offer.isNew ? "new-row" : ""}>
                <td>
                  {offer.artworkName}
                  {offer.isNew ? <span className="row-chip">New</span> : null}
                </td>
                <td>{offer.customerName}</td>
                <td>{formatCurrency(offer.offerPrice)}</td>
                <td>{offer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrderOfferEnquirySection;
