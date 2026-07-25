import React from "react";
import {
  bankDetailSteps,
  basicInformationSteps,
  countryOptions,
  documentUploadSteps,
  educationStatusOptions,
  genderOptions,
  mediumOptions,
  stateOptions,
} from "../data/dashboardData";
import ProfileAvatar from "./ProfileAvatar";

function ProfileWizardModal({
  draft,
  error,
  isOpen,
  onClose,
  onFieldChange,
  onImageChange,
  onDocumentImageChange,
  onNext,
  onPrev,
  onSkip,
  onSubmit,
  activeSection,
  onSectionChange,
  stepIndex,
}) {
  if (!isOpen) {
    return null;
  }

  const educationSteps =
    draft.educationStatus === "Employee"
      ? ["Education Details", "Experience", "Job Title & Preview"]
      : ["Education Details", "Year Of Study & Preview"];

  const sections = [
    { key: "basic", label: "Basic Information", steps: basicInformationSteps },
    { key: "documents", label: "Document Upload", steps: documentUploadSteps },
    { key: "bank", label: "Bank Details", steps: bankDetailSteps },
    { key: "education", label: "Education Details", steps: educationSteps },
  ];

  const activeConfig = sections.find((section) => section.key === activeSection) || sections[0];
  const stepCount = activeConfig.steps.length;
  const stepTitle = activeConfig.steps[stepIndex] || activeConfig.label;
  const progress = ((stepIndex + 1) / stepCount) * 100;
  const isFinalStep = activeSection === "education" && stepIndex === stepCount - 1;
  const showEducationPreview =
    activeSection === "education" &&
    ((draft.educationStatus === "Employee" && stepIndex === 2) ||
      (draft.educationStatus !== "Employee" && stepIndex === 1));

  const reviewItems = [
    { label: "Full Name", value: draft.fullName || "Not added yet" },
    { label: "Email", value: draft.email || "Not added yet" },
    { label: "Mobile", value: draft.mobile || "Not added yet" },
    { label: "Gender", value: draft.gender || "Not added yet" },
    { label: "Date of Birth", value: draft.dateOfBirth || "Not added yet" },
    { label: "Country", value: draft.country || "Not added yet" },
    { label: "State", value: draft.state || "Not added yet" },
    { label: "City", value: draft.city || "Not added yet" },
    { label: "Postal Code", value: draft.postalCode || "Not added yet" },
    { label: "Medium", value: draft.specialty || "Not added yet" },
    { label: "Experience", value: draft.yearsExperience || "Not added yet" },
    { label: "Website", value: draft.website || "Not added yet" },
    { label: "Instagram", value: draft.instagram || "Not added yet" },
    { label: "Achievements", value: draft.achievements || "Not added yet" },
    { label: "Profile Photo", value: draft.documentProfilePhoto ? "Uploaded" : "Not added yet" },
    { label: "ID Document", value: draft.documentIdFile ? "Uploaded" : "Not added yet" },
    { label: "Studio Image", value: draft.documentStudioImage ? "Uploaded" : "Not added yet" },
    { label: "Portfolio Link", value: draft.documentPortfolioLink || "Not added yet" },
    { label: "Account Holder Name", value: draft.bankAccountHolderName || "Not added yet" },
    { label: "Account Number", value: draft.bankAccountNumber || "Not added yet" },
    { label: "Account Name", value: draft.bankAccountName || "Not added yet" },
    { label: "Bank Name", value: draft.bankName || "Not added yet" },
    { label: "IFSC Code", value: draft.bankIfscCode || "Not added yet" },
    { label: "Account ID Name", value: draft.bankAccountIdName || "Not added yet" },
    { label: "Education Status", value: draft.educationStatus || "Not added yet" },
    { label: "Institute Name", value: draft.educationInstituteName || "Not added yet" },
    { label: "Year Of Study", value: draft.educationYearOfStudy || "Not added yet" },
    { label: "Experience", value: draft.educationExperience || "Not added yet" },
    { label: "Job Title", value: draft.educationJobTitle || "Not added yet" },
  ];

  return (
    <div
      className="profile-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="profile-modal">
        <div className="profile-modal-header">
          <div>
            <h3>{stepTitle}</h3>
            <p>{activeConfig.label} • Step {stepIndex + 1} of {stepCount}</p>
          </div>

          <button type="button" className="modal-close" onClick={onClose} aria-label="Close profile setup">
            Close
          </button>
        </div>

        <div className="profile-wizard-tabs" role="tablist" aria-label="Profile sections">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={`wizard-tab ${activeSection === section.key ? "active" : ""}`}
              onClick={() => onSectionChange(section.key)}
              role="tab"
              aria-selected={activeSection === section.key}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="profile-progress-track" aria-hidden="true">
          <span className="profile-progress-value" style={{ width: `${progress}%` }} />
        </div>

        <div className="profile-modal-body">
          {activeSection === "basic" && stepIndex === 0 && (
            <div className="profile-form-grid">
              <label className="form-field">
                <span>Full Name</span>
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(event) => onFieldChange("fullName", event.target.value)}
                  placeholder="Enter your full name"
                />
              </label>

              <label className="form-field">
                <span>Email Address</span>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(event) => onFieldChange("email", event.target.value)}
                  placeholder="Enter your email"
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 1 && (
            <div className="profile-form-grid">
              <label className="form-field">
                <span>Mobile Number</span>
                <input
                  type="tel"
                  value={draft.mobile}
                  onChange={(event) => onFieldChange("mobile", event.target.value)}
                  placeholder="Enter your mobile number"
                />
              </label>

              <label className="form-field">
                <span>Gender</span>
                <select value={draft.gender} onChange={(event) => onFieldChange("gender", event.target.value)}>
                  <option value="">Select gender</option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field form-field-full">
                <span>Date of Birth</span>
                <input
                  type="date"
                  value={draft.dateOfBirth}
                  onChange={(event) => onFieldChange("dateOfBirth", event.target.value)}
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 2 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Country</span>
                <select
                  value={draft.country}
                  onChange={(event) => onFieldChange("country", event.target.value)}
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field form-field-full">
                <span>State</span>
                <select value={draft.state} onChange={(event) => onFieldChange("state", event.target.value)}>
                  <option value="">Select state</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

            </div>
          )}

          {activeSection === "basic" && stepIndex === 3 && (
            <div className="profile-form-grid">
              <label className="form-field">
                <span>City</span>
                <input
                  type="text"
                  value={draft.city}
                  onChange={(event) => onFieldChange("city", event.target.value)}
                  placeholder="Enter your city"
                />
              </label>

              <label className="form-field">
                <span>Postal Code</span>
                <input
                  type="text"
                  value={draft.postalCode}
                  onChange={(event) => onFieldChange("postalCode", event.target.value)}
                  placeholder="Enter postal code"
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 4 && (
            <div className="profile-form-grid">
              <label className="form-field">
                <span>Art Medium</span>
                <select
                  value={draft.specialty}
                  onChange={(event) => onFieldChange("specialty", event.target.value)}
                >
                  {mediumOptions.map((medium) => (
                    <option key={medium} value={medium}>
                      {medium}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Years of Experience</span>
                <input
                  type="text"
                  value={draft.yearsExperience}
                  onChange={(event) => onFieldChange("yearsExperience", event.target.value)}
                  placeholder="e.g. 6 years"
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 5 && (
            <div className="profile-form-grid">
              <label className="form-field">
                <span>Website</span>
                <input
                  type="url"
                  value={draft.website}
                  onChange={(event) => onFieldChange("website", event.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </label>

              <label className="form-field">
                <span>Instagram</span>
                <input
                  type="text"
                  value={draft.instagram}
                  onChange={(event) => onFieldChange("instagram", event.target.value)}
                  placeholder="@yourhandle"
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 6 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Artist Bio</span>
                <textarea
                  rows="4"
                  value={draft.bio}
                  onChange={(event) => onFieldChange("bio", event.target.value)}
                  placeholder="Tell visitors about your practice, exhibitions, and creative approach."
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 7 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Awards, Exhibitions, or Highlights</span>
                <textarea
                  rows="4"
                  value={draft.achievements}
                  onChange={(event) => onFieldChange("achievements", event.target.value)}
                  placeholder="Add exhibitions, awards, gallery features, or key milestones."
                />
              </label>
            </div>
          )}

          {activeSection === "basic" && stepIndex === 8 && (
            <div className="image-step">
              <ProfileAvatar image={draft.profileImage} name={draft.fullName} className="profile-image-preview" />

              <div className="image-step-copy">
                <h4>Upload Profile Image</h4>
                <p>
                  Add a portrait or studio photo now, and you can change it again anytime
                  from your profile page.
                </p>

                <label className="upload-button">
                  {draft.profileImage ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => onImageChange(event.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
          )}

          {activeSection === "documents" && stepIndex === 0 && (
            <div className="upload-step">
              <div className="upload-preview">
                {draft.documentProfilePhoto ? (
                  <>
                    <img src={draft.documentProfilePhoto} alt="Profile upload" />
                    <button
                      type="button"
                      className="upload-remove"
                      onClick={() => onFieldChange("documentProfilePhoto", "")}
                      aria-label="Remove profile photo"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="upload-placeholder">No image uploaded</div>
                )}
              </div>
              <label className="upload-button">
                {draft.documentProfilePhoto ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onDocumentImageChange("documentProfilePhoto", event.target.files?.[0] || null)}
                />
              </label>
            </div>
          )}

          {activeSection === "documents" && stepIndex === 1 && (
            <div className="upload-step">
              <div className="upload-preview">
                {draft.documentIdFile ? (
                  <>
                    <img src={draft.documentIdFile} alt="ID document upload" />
                    <button
                      type="button"
                      className="upload-remove"
                      onClick={() => onFieldChange("documentIdFile", "")}
                      aria-label="Remove ID document"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="upload-placeholder">No document uploaded</div>
                )}
              </div>
              <label className="upload-button">
                {draft.documentIdFile ? "Change Document" : "Upload Document"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onDocumentImageChange("documentIdFile", event.target.files?.[0] || null)}
                />
              </label>
            </div>
          )}

          {activeSection === "documents" && stepIndex === 2 && (
            <div className="upload-step">
              <div className="upload-preview">
                {draft.documentStudioImage ? (
                  <>
                    <img src={draft.documentStudioImage} alt="Studio upload" />
                    <button
                      type="button"
                      className="upload-remove"
                      onClick={() => onFieldChange("documentStudioImage", "")}
                      aria-label="Remove studio image"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="upload-placeholder">No studio image uploaded</div>
                )}
              </div>
              <label className="upload-button">
                {draft.documentStudioImage ? "Change Studio Image" : "Upload Studio Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onDocumentImageChange("documentStudioImage", event.target.files?.[0] || null)}
                />
              </label>
            </div>
          )}

          {activeSection === "documents" && stepIndex === 3 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Portfolio Link</span>
                <input
                  type="url"
                  value={draft.documentPortfolioLink}
                  onChange={(event) => onFieldChange("documentPortfolioLink", event.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 0 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Account Holder Name</span>
                <input
                  type="text"
                  value={draft.bankAccountHolderName}
                  onChange={(event) => onFieldChange("bankAccountHolderName", event.target.value)}
                  placeholder="Enter account holder name"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 1 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Account Number</span>
                <input
                  type="text"
                  value={draft.bankAccountNumber}
                  onChange={(event) => onFieldChange("bankAccountNumber", event.target.value)}
                  placeholder="Enter account number"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 2 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Account Name</span>
                <input
                  type="text"
                  value={draft.bankAccountName}
                  onChange={(event) => onFieldChange("bankAccountName", event.target.value)}
                  placeholder="Enter account name"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 3 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Bank Name</span>
                <input
                  type="text"
                  value={draft.bankName}
                  onChange={(event) => onFieldChange("bankName", event.target.value)}
                  placeholder="Enter bank name"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 4 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>IFSC Code</span>
                <input
                  type="text"
                  value={draft.bankIfscCode}
                  onChange={(event) => onFieldChange("bankIfscCode", event.target.value)}
                  placeholder="Enter IFSC code"
                />
              </label>
            </div>
          )}

          {activeSection === "bank" && stepIndex === 5 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Account ID Name</span>
                <input
                  type="text"
                  value={draft.bankAccountIdName}
                  onChange={(event) => onFieldChange("bankAccountIdName", event.target.value)}
                  placeholder="Enter account ID name"
                />
              </label>
            </div>
          )}

          {activeSection === "education" && stepIndex === 0 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Schools/Institute Name</span>
                <input
                  type="text"
                  value={draft.educationInstituteName}
                  onChange={(event) => onFieldChange("educationInstituteName", event.target.value)}
                  placeholder="Enter school or institute name"
                />
              </label>

              <label className="form-field form-field-full">
                <span>Status</span>
                <select
                  value={draft.educationStatus}
                  onChange={(event) => onFieldChange("educationStatus", event.target.value)}
                >
                  <option value="">Select status</option>
                  {educationStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {activeSection === "education" && stepIndex === 1 && draft.educationStatus !== "Employee" && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Year Of Study</span>
                <input
                  type="text"
                  value={draft.educationYearOfStudy}
                  onChange={(event) => onFieldChange("educationYearOfStudy", event.target.value)}
                  placeholder="Enter year of study"
                />
              </label>
            </div>
          )}

          {activeSection === "education" && stepIndex === 1 && draft.educationStatus === "Employee" && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Experience</span>
                <input
                  type="text"
                  value={draft.educationExperience}
                  onChange={(event) => onFieldChange("educationExperience", event.target.value)}
                  placeholder="Enter your experience"
                />
              </label>
            </div>
          )}

          {activeSection === "education" && stepIndex === 2 && (
            <div className="profile-form-grid">
              <label className="form-field form-field-full">
                <span>Job Title</span>
                <input
                  type="text"
                  value={draft.educationJobTitle}
                  onChange={(event) => onFieldChange("educationJobTitle", event.target.value)}
                  placeholder="Enter job title"
                />
              </label>
            </div>
          )}

          {showEducationPreview ? (
            <div className="review-layout">
              <div className="review-hero">
                <ProfileAvatar image={draft.profileImage} name={draft.fullName} className="review-avatar" />
                <div>
                  <strong>{draft.fullName || "Artist Profile"}</strong>
                  <span>{draft.specialty || "Creative field not selected yet"}</span>
                  <p>{draft.bio || "Your artist bio will appear here after you write it."}</p>
                </div>
              </div>

              <div className="review-grid">
                {reviewItems.map((item) => (
                  <div key={item.label} className="review-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {error ? <p className="profile-error">{error}</p> : null}

        <div className="profile-modal-actions">
          <button
            type="button"
            className="profile-action secondary"
            onClick={onPrev}
            disabled={activeSection === "basic" && stepIndex === 0}
          >
            Previous
          </button>

          {isFinalStep ? (
            <button type="button" className="profile-action primary" onClick={onSubmit}>
              Complete Profile
            </button>
          ) : (
            <div className="profile-modal-actions-right">
              <button type="button" className="profile-action secondary" onClick={onSkip}>
                Skip
              </button>
              <button type="button" className="profile-action primary" onClick={onNext}>
                Save & Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileWizardModal;
