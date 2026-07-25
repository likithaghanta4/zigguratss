import React from "react";

function ProfileEmptyState({ onOpen }) {
  return (
    <section className="profile-empty">
      <div className="section-heading">
        <div>
          <h3>My Profile</h3>
          <p>
            Build your artist profile in guided steps, then review the finished version in
            one clean place.
          </p>
        </div>
      </div>

      <div className="profile-empty-card">
        <strong>Profile setup has not been completed yet.</strong>
        <p>
          Start the profile wizard to add personal details, location, creative bio, and
          your profile image.
        </p>
        <button type="button" className="profile-action primary profile-empty-button" onClick={onOpen}>
          Start Profile Setup
        </button>
      </div>
    </section>
  );
}

export default ProfileEmptyState;
