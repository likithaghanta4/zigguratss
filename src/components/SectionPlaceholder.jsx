import React from "react";

function SectionPlaceholder({ title }) {
  return (
    <section className="profile-empty">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
          <p>This area is ready for the next dashboard module when you want to expand it.</p>
        </div>
      </div>

      <div className="profile-empty-card">
        <strong>{title} is not set up yet.</strong>
        <p>
          The main interaction added right now is the guided `My Profile` workflow with
          step-by-step details and image upload.
        </p>
      </div>
    </section>
  );
}

export default SectionPlaceholder;
