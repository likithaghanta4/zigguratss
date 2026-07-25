import React, { useEffect, useState } from "react";
import {
  bankDetailSteps,
  defaultAwardsData,
  defaultOfferEnquiries,
  defaultOrderDetails,
  defaultProfileData,
  defaultRefundRequests,
  defaultRemarks,
  quickLinks,
  STORAGE_KEY,
  studioSignals,
  visitData,
} from "../data/dashboardData";
import { loadStoredDashboardState, readFileAsDataUrl } from "../utils/storage";
import { appStyles } from "../styles/appStyles";
import AwardsAndExhibitionsSection from "../components/AwardsAndExhibitionsSection";
import ArtworkSection from "../components/ArtworkSection";
import BlogSection from "../components/BlogSection";
import Chart from "../components/Chart";
import DonutMeter from "../components/DonutMeter";
import LoggedOutScreen from "../components/LoggedOutScreen";
import OrderDetailsSection from "../components/OrderDetailsSection";
import OrderOfferEnquirySection from "../components/OrderOfferEnquirySection";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileEmptyState from "../components/ProfileEmptyState";
import ProfileOverview from "../components/ProfileOverview";
import ProfileWizardModal from "../components/ProfileWizardModal";
import RefundOrdersSection from "../components/RefundOrdersSection";
import RemarkViewSection from "../components/RemarkViewSection";
import SectionPlaceholder from "../components/SectionPlaceholder";
import ToastStack from "../components/ToastStack";

function AdminPanel() {
  const [storedState] = useState(loadStoredDashboardState);
  const [activeSection, setActiveSection] = useState(storedState.activeSection || "Dashboard");
  const [range, setRange] = useState("daywise");
  const [profileData, setProfileData] = useState(storedState.profileData || defaultProfileData);
  const [isProfileComplete, setIsProfileComplete] = useState(Boolean(storedState.isProfileComplete));
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileSection, setProfileSection] = useState("basic");
  const [profileStep, setProfileStep] = useState(0);
  const [profileError, setProfileError] = useState("");
  const [awardsData, setAwardsData] = useState(storedState.awardsData || defaultAwardsData);
  const [artworkItems, setArtworkItems] = useState(storedState.artworkItems || []);
  const [blogItems, setBlogItems] = useState(storedState.blogItems || []);
  const [toasts, setToasts] = useState([]);
  const [isLoggedOut, setIsLoggedOut] = useState(
    typeof window !== "undefined" && window.location.hash === "#/login",
  );
  const [authMessage, setAuthMessage] = useState(
    typeof window !== "undefined" && window.location.hash === "#/login"
      ? "You have been logged out successfully."
      : "",
  );
  const selected = visitData[range];
  const chartPeak = Math.max(...selected.profile);
  const profileStrength = Math.round(
    (
      [
        profileData.fullName,
        profileData.email,
        profileData.mobile,
        profileData.gender,
        profileData.dateOfBirth,
        profileData.country,
        profileData.state,
        profileData.city,
        profileData.postalCode,
        profileData.specialty,
        profileData.yearsExperience,
        profileData.website,
        profileData.instagram,
        profileData.bio,
        profileData.achievements,
        profileData.profileImage,
      ].filter(Boolean).length / 16
    ) * 100,
  );

  const dashboardStats = [
    {
      title: "My Profile",
      value: `${profileStrength}%`,
      detail: isProfileComplete ? "Profile complete" : "Profile setup",
      accent: "gold",
    },
    {
      title: "My Artwork",
      value: `${artworkItems.length}`,
      detail: artworkItems.length === 1 ? "Portfolio piece" : "Curated pieces",
      accent: "indigo",
    },
    {
      title: "My Orders Detail",
      value: `${defaultOrderDetails.length}`,
      detail: "Tracked orders",
      accent: "coral",
    },
  ];

  const sectionDescriptions = {
    Dashboard: `${selected.label} snapshot for the Ziguratss studio`,
    "My Profile": "Complete your details step by step and review the finished profile.",
    "Add Awards And Exhibition": "Organize awards and exhibitions with guided entry blocks.",
    "My Artwork": "Manage portfolio pieces, previews, and quick actions.",
    "Order Offer Enquiry": "Review new offers with filters and highlight states.",
    "Refund Orders": "Track refund requests with color-coded status badges.",
    "Remark View": "Read collector and curator feedback in a richer card layout.",
    "My Order Detail": "Expand orders or open full detail popups for deeper context.",
    Blog: "Create and manage blog entries from one clean content panel.",
    Logout: "You are being redirected to the login page.",
  };

  useEffect(() => {
    if (typeof window === "undefined" || isLoggedOut) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profileData,
        isProfileComplete,
        awardsData,
        artworkItems,
        blogItems,
      }),
    );
  }, [isLoggedOut, profileData, isProfileComplete, awardsData, artworkItems, blogItems]);

  function showToast(message, type = "success") {
    const id = Date.now() + Math.random();

    setToasts((current) => [...current, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
  }

  function updateProfileField(field, value) {
    setProfileData((current) => ({
      ...current,
      [field]: value,
    }));
    setProfileError("");
  }

  async function handleProfileImageChange(file) {
    if (!file) {
      return;
    }

    try {
      const imageData = await readFileAsDataUrl(file);
      setProfileData((current) => ({
        ...current,
        profileImage: imageData,
      }));
      setProfileError("");
    } catch (error) {
      setProfileError("Profile image could not be uploaded. Please try another file.");
    }
  }

  async function handleDocumentImageChange(field, file) {
    if (!file) {
      return;
    }

    try {
      const imageData = await readFileAsDataUrl(file);
      setProfileData((current) => ({
        ...current,
        [field]: imageData,
      }));
      setProfileError("");
    } catch (error) {
      setProfileError("Document image could not be uploaded. Please try another file.");
    }
  }

  const profileSections = ["basic", "documents", "bank", "education"];

  function getEducationStepCount(status) {
    return status === "Employee" ? 3 : 2;
  }

  function getSectionStepCount(section) {
    if (section === "basic") {
      return 9;
    }

    if (section === "documents") {
      return 4;
    }

    if (section === "bank") {
      return bankDetailSteps.length;
    }

    return getEducationStepCount(profileData.educationStatus);
  }

  function getLastStepIndex(section) {
    return Math.max(getSectionStepCount(section) - 1, 0);
  }

  function validateProfileStep(section, step) {
    if (section === "basic" && step === 0) {
      if (!profileData.fullName.trim() || !profileData.email.trim()) {
        return "Please complete your name and email.";
      }
    }

    if (section === "basic" && step === 1) {
      if (!profileData.mobile.trim() || !profileData.gender.trim() || !profileData.dateOfBirth.trim()) {
        return "Please complete your contact details before continuing.";
      }
    }

    if (section === "basic" && step === 2) {
      if (!profileData.country.trim() || !profileData.state.trim()) {
        return "Please select your country and state.";
      }
    }

    if (section === "basic" && step === 3) {
      if (!profileData.city.trim() || !profileData.postalCode.trim()) {
        return "Please complete your city and postal code.";
      }
    }

    if (section === "basic" && step === 4) {
      if (!profileData.specialty.trim() || !profileData.yearsExperience.trim()) {
        return "Please add your art medium and experience before continuing.";
      }
    }

    if (section === "basic" && step === 6) {
      if (!profileData.bio.trim()) {
        return "Please add your artist bio before continuing.";
      }
    }

    if (section === "documents" && step === 0) {
      if (!profileData.documentProfilePhoto) {
        return "Please upload a profile photo before continuing.";
      }
    }

    if (section === "documents" && step === 1) {
      if (!profileData.documentIdFile) {
        return "Please upload your ID document before continuing.";
      }
    }

    if (section === "documents" && step === 2) {
      if (!profileData.documentStudioImage) {
        return "Please upload a studio image before continuing.";
      }
    }

    if (section === "documents" && step === 3) {
      if (!profileData.documentPortfolioLink.trim()) {
        return "Please add your portfolio link before continuing.";
      }
    }

    if (section === "bank" && step === 0) {
      if (!profileData.bankAccountHolderName.trim()) {
        return "Please add the account holder name before continuing.";
      }
    }

    if (section === "bank" && step === 1) {
      if (!profileData.bankAccountNumber.trim()) {
        return "Please add the account number before continuing.";
      }
    }

    if (section === "bank" && step === 2) {
      if (!profileData.bankAccountName.trim()) {
        return "Please add the account name before continuing.";
      }
    }

    if (section === "bank" && step === 3) {
      if (!profileData.bankName.trim()) {
        return "Please add the bank name before continuing.";
      }
    }

    if (section === "bank" && step === 4) {
      if (!profileData.bankIfscCode.trim()) {
        return "Please add the IFSC code before continuing.";
      }
    }

    if (section === "bank" && step === 5) {
      if (!profileData.bankAccountIdName.trim()) {
        return "Please add the account ID name before continuing.";
      }
    }

    if (section === "education" && step === 0) {
      if (!profileData.educationStatus.trim() || !profileData.educationInstituteName.trim()) {
        return "Please add your institute name and select a status before continuing.";
      }
    }

    if (section === "education" && step === 1 && profileData.educationStatus !== "Employee") {
      if (!profileData.educationYearOfStudy.trim()) {
        return "Please add your year of study before continuing.";
      }
    }

    if (section === "education" && step === 1 && profileData.educationStatus === "Employee") {
      if (!profileData.educationExperience.trim()) {
        return "Please add your experience before continuing.";
      }
    }

    if (section === "education" && step === 2) {
      if (!profileData.educationJobTitle.trim()) {
        return "Please add your job title before continuing.";
      }
    }

    return "";
  }

  function openProfileModal(step = 0, section = "basic") {
    setActiveSection("My Profile");
    setProfileSection(section);
    setProfileStep(step);
    setProfileError("");
    setIsProfileModalOpen(true);
  }

  function moveToNextSection() {
    const sectionIndex = profileSections.indexOf(profileSection);
    if (sectionIndex < profileSections.length - 1) {
      setProfileSection(profileSections[sectionIndex + 1]);
      setProfileStep(0);
      return true;
    }

    return false;
  }

  function moveToPreviousSection() {
    const sectionIndex = profileSections.indexOf(profileSection);
    if (sectionIndex > 0) {
      const previousSection = profileSections[sectionIndex - 1];
      setProfileSection(previousSection);
      setProfileStep(getLastStepIndex(previousSection));
      return true;
    }

    return false;
  }

  function handleProfileNext() {
    const validationError = validateProfileStep(profileSection, profileStep);

    if (validationError) {
      setProfileError(validationError);
      return;
    }

    const currentStepCount = getSectionStepCount(profileSection);
    if (profileStep < currentStepCount - 1) {
      setProfileStep((current) => current + 1);
      setProfileError("");
      return;
    }

    if (!moveToNextSection()) {
      handleProfileSubmit();
    } else {
      setProfileError("");
    }
  }

  function handleProfileSkip() {
    const currentStepCount = getSectionStepCount(profileSection);
    if (profileStep < currentStepCount - 1) {
      setProfileStep((current) => current + 1);
      setProfileError("");
      return;
    }

    if (!moveToNextSection()) {
      handleProfileSubmit();
    } else {
      setProfileError("");
    }
  }

  function handleProfilePrev() {
    if (profileStep > 0) {
      setProfileStep((current) => Math.max(current - 1, 0));
      setProfileError("");
      return;
    }

    if (moveToPreviousSection()) {
      setProfileError("");
    }
  }

  function handleProfileSubmit() {
    setIsProfileComplete(true);
    setActiveSection("My Profile");
    setIsProfileModalOpen(false);
    setProfileError("");
    showToast("Profile completed successfully.");
  }

  function handleAddAwardEntry(section, entry) {
    if (entry.remove) {
      setAwardsData((current) => ({
        ...current,
        [section]: current[section].filter((item) => item.id !== entry.id),
      }));
      return;
    }

    setAwardsData((current) => {
      const existingIndex = current[section].findIndex((item) => item.id === entry.id);
      if (existingIndex >= 0) {
        const updated = [...current[section]];
        updated[existingIndex] = entry;
        return {
          ...current,
          [section]: updated,
        };
      }

      return {
        ...current,
        [section]: [entry, ...current[section]],
      };
    });
  }

  function handleAddArtwork(entry) {
    setArtworkItems((current) => [entry, ...current]);
  }

  function handleRemoveArtwork(id) {
    setArtworkItems((current) => current.filter((item) => item.id !== id));
  }

  function handleAddBlog(blog) {
    setBlogItems((current) => [blog, ...current]);
  }

  function handleDeleteBlog(id) {
    setBlogItems((current) => current.filter((blog) => blog.id !== id));
  }

  function handleReturnToDashboard() {
    setIsLoggedOut(false);
    setAuthMessage("");
    setActiveSection("Dashboard");

    if (typeof window !== "undefined") {
      window.location.hash = "#/dashboard";
    }

    showToast("Welcome back to Ziguratss studio.");
  }

  function handleLogout() {
    setAuthMessage("You have been logged out successfully.");
    setIsLoggedOut(true);
    setActiveSection("Dashboard");
    setProfileData(defaultProfileData);
    setIsProfileComplete(false);
    setIsProfileModalOpen(false);
    setProfileStep(0);
    setProfileError("");
    setAwardsData(defaultAwardsData);
    setArtworkItems([]);
    setBlogItems([]);

    if (typeof window !== "undefined") {
      window.sessionStorage.clear();
      window.localStorage.removeItem(STORAGE_KEY);
      window.location.hash = "#/login";
    }

    showToast("You have been logged out successfully.");
  }

  function handleQuickLinkClick(link) {
    if (link === "Logout") {
      handleLogout();
      return;
    }

    setActiveSection(link);

    if (link === "My Profile" && !isProfileComplete) {
      openProfileModal(0);
    }
  }

  function renderMainContent() {
    if (activeSection === "Dashboard") {
      return (
        <>
          <div className="section-heading">
            <div>
              <h3>My Dashboard</h3>
              <p>
                A refined artist workspace with a warmer editorial feel and a more
                premium presentation than the original layout.
              </p>
            </div>
          </div>

          <div className="card-row">
            {dashboardStats.map((card) => (
              <article key={card.title} className={`dash-card ${card.accent}`}>
                <small>{card.title}</small>
                <strong>{card.value}</strong>
                <span>{card.detail}</span>
              </article>
            ))}
          </div>

          <div className="signal-row">
            {studioSignals.map((signal) => (
              <article key={signal.label} className="signal-card">
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </article>
            ))}
          </div>

          <section className="analytics-panel">
            <div className="analytics-topbar">
              <div>
                <h4>Visitor Insights</h4>
                <p>
                  Track how collectors are discovering your profile and artwork across
                  different time windows.
                </p>
              </div>

              <select
                className="range-select"
                aria-label="Select visitor range"
                value={range}
                onChange={(event) => setRange(event.target.value)}
              >
                <option value="daywise">Daywise</option>
                <option value="weekwise">Weekwise</option>
                <option value="monthwise">Monthwise</option>
              </select>
            </div>

            <div className="analytics-grid">
              <section className="chart-panel">
                <div className="panel-topline">
                  <div>
                    <h5>Profile Visitors Chart</h5>
                    <span>Peak engagement: {chartPeak} visitors</span>
                  </div>
                  <span>Total Profile Visitors - {selected.profileTotal}</span>
                </div>

                <Chart values={selected.profile} accent="#49a7df" />

                <div className="chart-legend" aria-hidden="true">
                  <span className="legend-dot" style={{ color: "#49a7df" }}>Total Visitors</span>
                  <span className="legend-dot" style={{ color: "#3f4a94" }}>Returning Viewers</span>
                  <span className="legend-dot" style={{ color: "#d9af37" }}>New Visitors</span>
                </div>
              </section>

              <aside className="insight-panel">
                <div className="panel-topline">
                  <div>
                    <h5>Artwork Visitors Chart</h5>
                    <span>Portfolio conversion overview</span>
                  </div>
                  <span>Total Artwork Visitors - {selected.artworkTotal}</span>
                </div>

                <div className="insight-content">
                  <DonutMeter
                    value={Math.min(
                      94,
                      Math.round((selected.artworkTotal / selected.profileTotal) * 100),
                    )}
                  />
                </div>
              </aside>
            </div>

            <div className="footer-line">
              <span>Dashboard tuned for both desktop and mobile screens.</span>
              <span>Freshened with glassmorphism panels, editorial typography, and custom SVG analytics.</span>
            </div>
          </section>
        </>
      );
    }

    if (activeSection === "My Profile") {
      if (!isProfileComplete) {
        return <ProfileEmptyState onOpen={() => openProfileModal(profileStep)} />;
      }

      return (
        <ProfileOverview
          profile={profileData}
          onEdit={(section) => openProfileModal(0, section)}
          onImageChange={handleProfileImageChange}
        />
      );
    }

    if (activeSection === "Add Awards And Exhibition") {
      return (
        <AwardsAndExhibitionsSection
          entries={awardsData}
          onAddEntry={handleAddAwardEntry}
          showToast={showToast}
        />
      );
    }

    if (activeSection === "My Artwork") {
      return (
        <ArtworkSection
          items={artworkItems}
          onAddArtwork={handleAddArtwork}
          onRemoveArtwork={handleRemoveArtwork}
          showToast={showToast}
        />
      );
    }

    if (activeSection === "Order Offer Enquiry") {
      return <OrderOfferEnquirySection offers={defaultOfferEnquiries} />;
    }

    if (activeSection === "Refund Orders") {
      return <RefundOrdersSection refunds={defaultRefundRequests} />;
    }

    if (activeSection === "Remark View") {
      return <RemarkViewSection remarks={defaultRemarks} />;
    }

    if (activeSection === "My Order Detail") {
      return <OrderDetailsSection orders={defaultOrderDetails} />;
    }

    if (activeSection === "Blog") {
      return (
        <BlogSection
          blogs={blogItems}
          onAddBlog={handleAddBlog}
          onDeleteBlog={handleDeleteBlog}
          showToast={showToast}
        />
      );
    }

    return <SectionPlaceholder title={activeSection} />;
  }

  return (
    <>
      <style>{appStyles}</style>

      <div className="app-shell">
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7b52" />
              <stop offset="55%" stopColor="#d9af37" />
              <stop offset="100%" stopColor="#3f4a94" />
            </linearGradient>
          </defs>
        </svg>

        {isLoggedOut ? (
          <LoggedOutScreen message={authMessage} onLogin={handleReturnToDashboard} />
        ) : (
          <>
            <main className="dashboard-frame">

              <section className="hero">
                <h1 className="hero-title">WELCOME TO ZIGURATSS!</h1>
                <div className="hero-divider">
                  <span>Dive Into The Sea Of Artworks</span>
                </div>

                <div className="content-grid">
                  <aside className="sidebar">
                    <div className="profile-card">
                      <ProfileAvatar image={profileData.profileImage} name={profileData.fullName} />
                      <h2>Welcome {profileData.fullName}</h2>
                      <p>{profileData.email}</p>
                      <div className="status-pill">
                        {isProfileComplete ? "Creative portfolio live" : "Profile setup in progress"}
                      </div>
                    </div>

                    <div className="quick-links">
                      <p className="panel-label">Quick Links</p>
                      <nav aria-label="Quick links">
                        {quickLinks.map((link) => (
                          <button
                            key={link}
                            type="button"
                            className={`quick-link ${activeSection === link ? "active" : ""}`}
                            onClick={() => handleQuickLinkClick(link)}
                          >
                            {link}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </aside>

                  <section className="main-column">
                    <div key={activeSection} className="content-stage">
                      {renderMainContent()}
                    </div>
                  </section>
                </div>
              </section>
            </main>

            <ProfileWizardModal
              draft={profileData}
              error={profileError}
              isOpen={isProfileModalOpen}
              onClose={() => setIsProfileModalOpen(false)}
              onFieldChange={updateProfileField}
              onImageChange={handleProfileImageChange}
              onDocumentImageChange={handleDocumentImageChange}
              onNext={handleProfileNext}
              onPrev={handleProfilePrev}
              onSkip={handleProfileSkip}
              onSubmit={handleProfileSubmit}
              activeSection={profileSection}
              onSectionChange={(section) => {
                setProfileSection(section);
                setProfileStep(0);
                setProfileError("");
              }}
              stepIndex={profileStep}
            />
          </>
        )}

        <ToastStack toasts={toasts} />
      </div>
    </>
  );
}

export default AdminPanel;
