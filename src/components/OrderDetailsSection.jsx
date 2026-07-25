import React, { useState } from "react";
import { formatCurrency } from "../utils/format";
import StatusBadge from "./StatusBadge";

function OrderDetailsSection({ orders }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <section className="module-section">
      <div className="section-heading">
        <div>
          <h3>My Order Detail</h3>
          <p>
            Expand rows for quick delivery context or open the full modal for a complete
            order summary.
          </p>
        </div>
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Artwork</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="interactive-row">
                  <td>{order.orderId}</td>
                  <td>{order.artworkName}</td>
                  <td>{order.customerName}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <div className="table-action-group">
                      <button
                        type="button"
                        className="table-action"
                        onClick={() =>
                          setExpandedOrderId((current) => (current === order.id ? null : order.id))
                        }
                      >
                        {expandedOrderId === order.id ? "Collapse" : "Expand"}
                      </button>
                      <button type="button" className="table-action" onClick={() => setSelectedOrder(order)}>
                        Details
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedOrderId === order.id ? (
                  <tr className="expanded-row">
                    <td colSpan="6">
                      <div className="expanded-order-card">
                        <div>
                          <span className="request-meta">Shipping Address</span>
                          <strong>{order.address}</strong>
                        </div>
                        <div>
                          <span className="request-meta">Order Notes</span>
                          <strong>{order.notes}</strong>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder ? (
        <div className="detail-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="detail-modal" onClick={(event) => event.stopPropagation()}>
            <div className="profile-modal-header">
              <div>
                <h3>Order Details</h3>
                <p>{selectedOrder.orderId} • {selectedOrder.customerName}</p>
              </div>
              <button type="button" className="modal-close" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-card">
                <span className="request-meta">Artwork</span>
                <strong>{selectedOrder.artworkName}</strong>
              </div>
              <div className="detail-card">
                <span className="request-meta">Amount</span>
                <strong>{formatCurrency(selectedOrder.amount)}</strong>
              </div>
              <div className="detail-card">
                <span className="request-meta">Status</span>
                <strong>{selectedOrder.status}</strong>
              </div>
              <div className="detail-card">
                <span className="request-meta">Date</span>
                <strong>{selectedOrder.date}</strong>
              </div>
            </div>

            <div className="detail-list-card">
              <span className="request-meta">Included Items</span>
              <ul className="detail-list">
                {selectedOrder.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-list-card">
              <span className="request-meta">Shipping Address</span>
              <strong>{selectedOrder.address}</strong>
              <p>{selectedOrder.notes}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default OrderDetailsSection;
