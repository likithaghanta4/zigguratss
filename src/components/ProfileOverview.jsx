import React from "react";
import ProfileAvatar from "./ProfileAvatar";

function ProfileOverview({ profile, onEdit, onImageChange }) {
  const infoCards = [
    {
      title: "Basic Information",
      sectionKey: "basic",
      groups: [
        {
          title: "Personal",
          items: [
            ["Full Name", profile.fullName || "-"],
            ["Email", profile.email || "-"],
            ["Mobile", profile.mobile || "-"],
            ["Gender", profile.gender || "-"],
            ["Date of Birth", profile.dateOfBirth || "-"],
          ],
        },
        {
          title: "Location",
          items: [
            ["Country", profile.country || "-"],
            ["State", profile.state || "-"],
            ["City", profile.city || "-"],
            ["Postal Code", profile.postalCode || "-"],
          ],
        },
        {
          title: "Artist",
          items: [
            ["Medium", profile.specialty || "-"],
            ["Experience", profile.yearsExperience || "-"],
            ["Website", profile.website || "-"],
            ["Instagram", profile.instagram || "-"],
            ["Highlights", profile.achievements || "-"],
          ],
        },
      ],
    },
    {
      title: "Bank Details",
      sectionKey: "bank",
      items: [
        ["Account Holder Name", profile.bankAccountHolderName || "-"],
        ["Account Number", profile.bankAccountNumber || "-"],
        ["Account Name", profile.bankAccountName || "-"],
        ["Bank Name", profile.bankName || "-"],
        ["IFSC Code", profile.bankIfscCode || "-"],
        ["Account ID Name", profile.bankAccountIdName || "-"],
      ],
    },
    {
      title: "Education Details",
      sectionKey: "education",
      items: [
        ["Status", profile.educationStatus || "-"],
        ["Institute Name", profile.educationInstituteName || "-"],
        ["Year Of Study", profile.educationYearOfStudy || "-"],
        ["Experience", profile.educationExperience || "-"],
        ["Job Title", profile.educationJobTitle || "-"],
      ],
    },
  ];

  const documentItems = [
    { label: "Profile Photo", image: profile.documentProfilePhoto },
    { label: "ID Document", image: profile.documentIdFile },
    { label: "Studio Image", image: profile.documentStudioImage },
    { label: "Portfolio Link", value: profile.documentPortfolioLink || "-" },
  ];

  return (
    <section className="profile-overview">
      <div className="section-heading">
        <div>
          <h3>My Profile</h3>
          <p>
            Review the completed artist profile and update any details whenever you need.
          </p>
        </div>
      </div>

      <div className="profile-hero-card">
        <ProfileAvatar image={profile.profileImage} name={profile.fullName} className="profile-hero-avatar" />

        <div className="profile-hero-copy">
          <span className="panel-label">Artist Profile</span>
          <h4>{profile.fullName}</h4>
          <p>{profile.bio || "Add your artist bio to describe your practice and style."}</p>

          <div className="profile-hero-tags">
            <span>{profile.specialty || "Creative Medium"}</span>
            <span>{profile.city || "City"}, {profile.state || "State"}</span>
          </div>

          <div className="profile-hero-actions">
            <button type="button" className="profile-action primary" onClick={onEdit}>
              Edit Profile
            </button>

            <label className="profile-action secondary upload-inline">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onImageChange(event.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="profile-info-grid">
        {infoCards.map((card) => (
          <article
            key={card.title}
            className={`profile-info-card${card.title === "Basic Information" ? " basic-info" : ""}`}
          >
            <div className="profile-card-header">
              <h5>{card.title}</h5>
              <button
                type="button"
                className="card-edit"
                onClick={() => onEdit(card.sectionKey)}
              >
                Edit
              </button>
            </div>
            {card.groups ? (
              <div className="profile-info-groups">
                {card.groups.map((group) => (
                  <div key={group.title} className="profile-group">
                    <span className="profile-group-title">{group.title}</span>
                    <div className="profile-facts">
                      {group.items.map(([label, value]) => (
                        <div key={label} className="profile-fact">
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-facts">
                {card.items.map(([label, value]) => (
                  <div key={label} className="profile-fact">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}

        <article className="profile-info-card">
          <div className="profile-card-header">
            <h5>Document Uploads</h5>
            <button
              type="button"
              className="card-edit"
              onClick={() => onEdit("documents")}
            >
              Edit
            </button>
          </div>
          <div className="document-grid">
            {documentItems.map((item) => (
              <div key={item.label} className="document-tile">
                <span>{item.label}</span>
                {item.image ? (
                  <img src={item.image} alt={item.label} />
                ) : (
                  <strong>{item.value || "Not added"}</strong>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProfileOverview;
