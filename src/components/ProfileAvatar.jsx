import React from "react";
import ProfilePortrait from "./ProfilePortrait";

function ProfileAvatar({ image, name, className = "" }) {
  if (image) {
    return (
      <div className={`portrait-shell ${className}`.trim()}>
        <img src={image} alt={`${name || "Artist"} profile`} className="portrait-image" />
        <div className="portrait-badge">Artist</div>
      </div>
    );
  }

  return <ProfilePortrait className={className} />;
}

export default ProfileAvatar;
