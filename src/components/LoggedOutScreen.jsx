import React from "react";

function LoggedOutScreen({ message, onLogin }) {
  return (
    <div className="logged-out-screen">
      <div className="logged-out-card">
        <span className="panel-label">Login Page</span>
        <h1>Ziguratss Admin Panel</h1>
        <p>{message || "You have been logged out successfully."}</p>
        <button type="button" className="profile-action primary" onClick={onLogin}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

export default LoggedOutScreen;
