export const appStyles = `
        :root {
          color-scheme: light;
          --bg: #f6efe6;
          --paper: rgba(255, 255, 255, 0.84);
          --paper-strong: rgba(255, 255, 255, 0.96);
          --ink: #24324a;
          --muted: #7b8394;
          --gold: #d9af37;
          --gold-deep: #bf8d1f;
          --indigo: #3f4a94;
          --coral: #ff7b52;
          --line: rgba(36, 50, 74, 0.12);
          --glow: 0 28px 60px rgba(69, 50, 24, 0.12);
        }

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          height: 100%;
          min-height: 100%;
        }

        body {
          font-family: "Avenir Next", "Trebuchet MS", "Geneva", sans-serif;
          color: var(--ink);
          background:
            radial-gradient(circle at top left, rgba(217, 175, 55, 0.14), transparent 28%),
            radial-gradient(circle at right 15% top 18%, rgba(63, 74, 148, 0.12), transparent 24%),
            linear-gradient(160deg, #fbf6ee 0%, #f3ebe2 42%, #eef2f7 100%);
          overflow-x: hidden;
        }

        button, input, select, textarea {
          font: inherit;
        }

        .app-shell {
          position: relative;
          min-height: 100dvh;
          overflow-x: hidden;
          overflow-y: visible;
          padding: 22px 22px 30px;
          display: flex;
        }

        .app-shell::before,
        .app-shell::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(10px);
          pointer-events: none;
        }

        .app-shell::before {
          width: 320px;
          height: 320px;
          top: -120px;
          left: -80px;
          background: radial-gradient(circle, rgba(255, 123, 82, 0.18), transparent 70%);
        }

        .app-shell::after {
          width: 360px;
          height: 360px;
          right: -120px;
          bottom: -140px;
          background: radial-gradient(circle, rgba(63, 74, 148, 0.16), transparent 72%);
        }
         
        .dashboard-frame {
          position: relative;
          z-index: 1;
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          color: var(--muted);
          font-size: 0.95rem;
        }

        .topbar strong {
          color: var(--ink);
          font-weight: 700;
        }

        .hero {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.36));
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow: var(--glow);
          border-radius: 32px;
          padding: 34px 30px 28px;
          backdrop-filter: blur(20px);
          min-height: 1100px;
          display: flex;
          flex-direction: column;
        }

        .hero-title {
          margin: 0;
          text-align: center;
          font-family: Baskerville, "Palatino Linotype", "Book Antiqua", serif;
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #18243d;
        }

        .hero-divider {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 18px;
          margin: 16px auto 30px;
          max-width: 940px;
        }

        .hero-divider span {
          font-size: 0.92rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #f3a109;
          font-weight: 800;
          text-align: center;
          white-space: nowrap;
        }

        .hero-divider::before,
        .hero-divider::after {
          content: "";
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(36, 50, 74, 0.28), transparent);
        }

        .content-grid {
          display: grid;
          grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
          gap: 22px;
          align-items: stretch;
          flex: 1;
        }

        .sidebar {
          background: var(--paper-strong);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 28px;
          padding: 22px 18px;
          box-shadow: 0 22px 42px rgba(21, 32, 53, 0.08);
        position: relative;
        transform: translateY(-140px);
        }

        .profile-card {
          background:
            radial-gradient(circle at top right, rgba(217, 175, 55, 0.14), transparent 42%),
            linear-gradient(180deg, #ffffff 0%, #f8f2e8 100%);
          border-radius: 24px;
          padding: 18px;
          border: 1px solid rgba(36, 50, 74, 0.08);
        }

        .portrait-shell {
          position: relative;
          width: 132px;
          margin-bottom: 12px;
        }

        .portrait-svg {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 28px;
          box-shadow: 0 18px 28px rgba(63, 74, 148, 0.16);
        }

        .portrait-image {
          display: block;
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 28px;
          box-shadow: 0 18px 28px rgba(63, 74, 148, 0.16);
        }

        .portrait-badge {
          position: absolute;
          right: -8px;
          bottom: -8px;
          padding: 7px 12px;
          border-radius: 999px;
          background: #24324a;
          color: #ffffff;
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          box-shadow: 0 12px 20px rgba(36, 50, 74, 0.24);
        }

        .profile-card h2 {
          margin: 16px 0 6px;
          font-size: 1.2rem;
        }

        .profile-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.5;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(217, 175, 55, 0.13);
          color: var(--gold-deep);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .status-pill::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: currentColor;
        }

        .quick-links {
          margin-top: 20px;
        }

        .panel-label {
          margin: 0 0 14px;
          font-size: 0.82rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .quick-links nav {
          display: grid;
          gap: 10px;
        }

        .quick-link {
          text-align: left;
          border: 0;
          padding: 12px 14px;
          border-radius: 14px;
          background: transparent;
          color: var(--ink);
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
          cursor: pointer;
        }

        .quick-link:hover {
          transform: translateX(4px);
          background: rgba(36, 50, 74, 0.06);
        }

        .quick-link.active {
          background: linear-gradient(135deg, var(--gold), #e8c86d);
          color: #fff;
          box-shadow: 0 14px 24px rgba(217, 175, 55, 0.28);
        }

        .profile-empty,
        .profile-overview {
          display: grid;
          gap: 18px;
        }

        .profile-empty-card,
        .profile-hero-card,
        .profile-info-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.88);
          box-shadow: 0 24px 40px rgba(21, 32, 53, 0.08);
        }

        .profile-empty-card {
          width: min(520px, 100%);
          margin: 0 auto;
          padding: 26px;
          border-radius: 28px;
          text-align: center;
        }

        .profile-empty-card strong {
          display: block;
          font-size: 1.18rem;
        }

        .profile-empty-card p {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.6;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
        }

        .profile-empty-button {
          margin-top: 22px;
          min-width: 210px;
        }

        .profile-hero-card {
          display: grid;
          grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
          gap: 24px;
          padding: 26px;
          border-radius: 30px;
        }

        .profile-hero-avatar {
          width: min(240px, 100%);
          margin: 0;
        }

        .profile-hero-copy h4 {
          margin: 4px 0 10px;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-family: Baskerville, "Palatino Linotype", "Book Antiqua", serif;
          font-weight: 500;
        }

        .profile-hero-copy p {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
          max-width: 700px;
        }

        .profile-hero-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .profile-hero-tags span {
          padding: 9px 14px;
          border-radius: 999px;
          background: rgba(36, 50, 74, 0.06);
          color: var(--ink);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .profile-hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 22px;
        }

        .profile-action {
          border: 0;
          border-radius: 14px;
          padding: 13px 18px;
          cursor: pointer;
          font-weight: 700;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          text-align: center;
        }

        .profile-action:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .profile-action:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .profile-action.primary,
        .upload-button {
          background: linear-gradient(135deg, #d2a92f, #e4bd42);
          color: #ffffff;
          box-shadow: 0 14px 24px rgba(217, 175, 55, 0.24);
        }

        .profile-action.secondary {
          background: rgba(36, 50, 74, 0.08);
          color: var(--ink);
        }

        .upload-inline,
        .upload-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 10px 16px;
          border-radius: 10px;
        }

        .upload-inline input,
        .upload-button input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .profile-info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .profile-info-card {
          padding: 22px;
          border-radius: 26px;
        }

        .document-card {
          grid-column: 1 / -1;
        }

        .document-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .document-tile {
          display: grid;
          gap: 10px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(36, 50, 74, 0.04);
        }

        .document-tile span {
          color: var(--muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .document-tile strong {
          font-size: 0.95rem;
        }

        .document-tile img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 12px 20px rgba(36, 50, 74, 0.12);
        }

        .profile-info-card h5 {
          margin: 0 0 18px;
          font-size: 1.06rem;
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .card-edit {
          border: 0;
          background: rgba(36, 50, 74, 0.08);
          color: var(--gold-deep);
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
        }

        .card-edit:hover {
          background: rgba(36, 50, 74, 0.14);
          transform: translateY(-1px);
        }

        .profile-info-groups {
          display: grid;
          gap: 18px;
        }

        .profile-group {
          padding: 14px 14px 2px;
          border-radius: 18px;
          background: rgba(36, 50, 74, 0.04);
        }

        .profile-group-title {
          display: block;
          color: var(--muted);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .profile-facts {
          display: grid;
          gap: 14px;
        }

        .basic-info .profile-facts {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .profile-fact {
          padding-top: 14px;
          border-top: 1px solid rgba(36, 50, 74, 0.08);
        }

        .profile-fact:first-child {
          padding-top: 0;
          border-top: 0;
        }

        .profile-fact span,
        .review-card span,
        .review-hero span {
          display: block;
          color: var(--muted);
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .profile-fact strong,
        .review-card strong,
        .review-hero strong {
          display: block;
          margin-top: 8px;
          font-size: 1rem;
          line-height: 1.45;
        }

        .profile-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 30;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(15, 18, 24, 0.58);
          backdrop-filter: blur(6px);
          overflow-y: auto;
        }

        .profile-modal {
          width: min(760px, 100%);
          max-height: none;
          overflow: visible;
          padding: 28px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 40px 80px rgba(12, 18, 30, 0.28);
        }

        .profile-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 16px;
        }

        .profile-modal-header h3 {
          margin: 0;
          font-size: clamp(1.6rem, 3vw, 2rem);
        }

        .profile-modal-header p {
          margin: 6px 0 0;
          color: var(--muted);
        }

        .modal-close {
          border: 0;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          font-weight: 700;
        }

        .profile-wizard-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 16px 0 12px;
        }

        .wizard-tab {
          border: 0;
          background: rgba(36, 50, 74, 0.08);
          color: var(--ink);
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: transform 160ms ease, background 160ms ease;
        }

        .wizard-tab:hover {
          transform: translateY(-1px);
        }

        .wizard-tab.active {
          background: linear-gradient(135deg, #d2a92f, #e4bd42);
          color: #ffffff;
          box-shadow: 0 12px 22px rgba(217, 175, 55, 0.24);
        }

        .profile-progress-track {
          margin: 18px 0 24px;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: rgba(36, 50, 74, 0.1);
          overflow: hidden;
        }

        .profile-progress-value {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(135deg, #d2a92f, #e4bd42);
        }

        .profile-modal-body {
          min-height: 240px;
        }

        .profile-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: start;
        }

        .form-field {
          display: grid;
          gap: 8px;
        }

        .form-field span {
          font-size: 0.9rem;
          font-weight: 700;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          width: 100%;
          border: 1px solid rgba(36, 50, 74, 0.14);
          border-radius: 14px;
          background: rgba(248, 249, 252, 0.96);
          padding: 14px 15px;
          color: var(--ink);
        }

        .form-field textarea {
          resize: vertical;
          min-height: 112px;
        }

        .form-field-full {
          grid-column: 1 / -1;
        }

        .image-step {
          display: grid;
          grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
          gap: 24px;
          align-items: center;
        }

        .upload-step {
          display: grid;
          gap: 16px;
          justify-items: start;
        }

        .upload-preview {
          width: min(420px, 100%);
          border-radius: 18px;
          border: 1px solid rgba(36, 50, 74, 0.1);
          background: rgba(36, 50, 74, 0.04);
          padding: 12px;
          position: relative;
        }

        .upload-preview img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }

        .upload-placeholder {
          height: 200px;
          display: grid;
          place-items: center;
          color: var(--muted);
          border-radius: 12px;
          background: rgba(36, 50, 74, 0.06);
          font-weight: 600;
        }

        .upload-remove {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 0;
          background: rgba(36, 50, 74, 0.5);
          color: #ffffff;
          font-size: 1.1rem;
          line-height: 1;
          cursor: pointer;
          display: grid;
          place-items: center;
        }

        .profile-image-preview,
        .review-avatar {
          width: min(210px, 100%);
          margin: 0;
        }

        .image-step-copy h4 {
          margin: 0;
          font-size: 1.25rem;
        }

        .image-step-copy p {
          margin: 10px 0 18px;
          color: var(--muted);
          line-height: 1.6;
        }

        .review-layout {
          display: grid;
          gap: 20px;
        }

        .review-hero {
          display: grid;
          grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
          gap: 22px;
          align-items: center;
          padding: 18px;
          border-radius: 24px;
          background: rgba(36, 50, 74, 0.04);
        }

        .review-hero p {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .review-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .review-card {
          padding: 16px;
          border-radius: 18px;
          background: rgba(36, 50, 74, 0.04);
        }

        .profile-error {
          margin: 20px 0 0;
          color: #b54f2b;
          font-weight: 700;
        }

        .profile-modal-actions {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 22px;
        }

        .profile-modal-actions-right {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: end;
        }

        .profile-modal-actions .profile-action {
          min-width: 160px;
        }

        .main-column {
          display: grid;
          gap: 18px;
          align-content: start;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 14px;
        }

        .section-heading > div {
          flex: 1;
          min-width: 0;
        }

        .section-heading h3 {
          margin: 0;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-family: Baskerville, "Palatino Linotype", "Book Antiqua", serif;
          font-weight: 500;
        }

        .section-heading p {
          margin: 0;
          color: var(--muted);
          max-width: none;
          margin-top: 0.7rem
        }

        .card-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .dash-card {
          position: relative;
          overflow: hidden;
          min-height: 168px;
          padding: 24px;
          border-radius: 30px;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: end;
          box-shadow: 0 24px 36px rgba(28, 36, 55, 0.18);
          isolation: isolate;
        }

        .dash-card::before {
          content: "";
          position: absolute;
          inset: auto -10% 55% auto;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          z-index: -1;
        }

        .dash-card::after {
          content: "";
          position: absolute;
          inset: 16px 16px auto auto;
          width: 52px;
          height: 52px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.08);
          z-index: -1;
        }

        .dash-card.gold {
          background: linear-gradient(145deg, #c69b18, #e4be46);
        }

        .dash-card.indigo {
          background: linear-gradient(145deg, #2f3c87, #5966b9);
        }

        .dash-card.coral {
          background: linear-gradient(145deg, #f56b46, #ff9868);
        }

        .dash-card small {
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.86;
        }

        .dash-card strong {
          margin-top: 12px;
          font-size: 2rem;
          font-weight: 800;
        }

        .dash-card span {
          margin-top: 6px;
          font-size: 1rem;
        }

        .signal-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .signal-card {
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(36, 50, 74, 0.08);
          box-shadow: 0 16px 24px rgba(21, 32, 53, 0.06);
        }

        .signal-card span {
          display: block;
          color: var(--muted);
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .signal-card strong {
          font-size: 1.6rem;
        }

        .analytics-panel {
          display: grid;
          gap: 22px;
          padding: 24px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.86);
          box-shadow: 0 28px 40px rgba(21, 32, 53, 0.08);
        }

        .analytics-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .analytics-topbar h4 {
          margin: 0;
          font-size: 1.2rem;
        }

        .analytics-topbar p {
          margin: 4px 0 0;
          color: var(--muted);
        }

        .range-select {
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(36, 50, 74, 0.12);
          background: rgba(255, 255, 255, 0.94);
          color: var(--ink);
          min-width: 168px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .chart-panel,
        .insight-panel {
          background: linear-gradient(180deg, rgba(250, 251, 255, 0.96), rgba(245, 241, 236, 0.92));
          border-radius: 24px;
          padding: 20px;
          border: 1px solid rgba(36, 50, 74, 0.08);
          height: 100%;
        }

        .chart-panel {
          display: flex;
          flex-direction: column;
        }

        .panel-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .panel-topline h5 {
          margin: 0;
          font-size: 1.08rem;
        }

        .panel-topline span {
          color: var(--muted);
          font-size: 0.92rem;
        }

        .chart-svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .chart-grid {
          stroke: rgba(36, 50, 74, 0.08);
          stroke-width: 1;
        }

        .chart-grid.vertical {
          stroke-dasharray: 3 6;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 12px;
          color: var(--muted);
          font-size: 0.88rem;
        }

        .legend-dot {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: currentColor;
        }

        .insight-panel {
          display: flex;
          flex-direction: column;
        }

        .insight-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
        }

        .donut-wrap {
          position: relative;
          width: min(210px, 100%);
          margin: 0 auto;
        }

        .donut-chart {
          width: 100%;
          height: auto;
          transform: rotate(-90deg);
        }

        .donut-track,
        .donut-value {
          fill: none;
          stroke-width: 14;
        }

        .donut-track {
          stroke: rgba(36, 50, 74, 0.08);
        }

        .donut-value {
          stroke: url(#donutGradient);
          stroke-linecap: round;
          transform-origin: 50% 50%;
        }

        .donut-copy {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          text-align: center;
        }

        .donut-copy strong {
          display: block;
          font-size: 2rem;
        }

        .content-stage {
          display: grid;
          gap: 18px;
          animation: sectionReveal 260ms ease;
        }

        @keyframes sectionReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .module-section,
        .module-stack {
          display: grid;
          gap: 18px;
        }

        .module-card {
          padding: 22px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 22px 38px rgba(21, 32, 53, 0.08);
        }

        .accordion-card {
          padding: 0;
          overflow: hidden;
        }

        .accordion-toggle {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 20px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          cursor: pointer;
          color: var(--ink);
        }

        .accordion-toggle strong {
          font-size: 1.06rem;
        }

        .accordion-toggle span {
          color: var(--gold-deep);
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.76rem;
        }

        .accordion-body {
          padding: 0 22px 22px;
          border-top: 1px solid rgba(36, 50, 74, 0.08);
        }

        .module-form-grid {
          margin-top: 18px;
        }

        .animated-field input,
        .animated-field select,
        .animated-field textarea {
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .animated-field input:focus,
        .animated-field select:focus,
        .animated-field textarea:focus {
          outline: 0;
          transform: translateY(-1px);
          border-color: rgba(217, 175, 55, 0.68);
          box-shadow: 0 10px 20px rgba(217, 175, 55, 0.12);
        }

        .module-action-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .module-action-row.align-bottom {
          align-self: end;
          justify-content: flex-start;
          padding-bottom: 4px;
        }

        .blog-action-row {
          margin-top: 20px;
          padding-top: 8px;
          justify-content: flex-end;
        }

        .inline-error {
          margin: 16px 0 0;
          color: #b54f2b;
          font-weight: 700;
        }

        .inline-empty {
          margin-top: 18px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(36, 50, 74, 0.04);
          color: var(--muted);
        }

        .section-heading-spread {
          justify-content: space-between;
          align-items: start;
        }

        .table-shell {
          overflow-x: auto;
          border-radius: 22px;
          border: 1px solid rgba(36, 50, 74, 0.08);
          background: rgba(255, 255, 255, 0.72);
        }

        .accordion-body .table-shell {
          margin-top: 18px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
        }

        .data-table th,
        .data-table td {
          padding: 15px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(36, 50, 74, 0.08);
          vertical-align: middle;
        }

        .data-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          background: rgba(36, 50, 74, 0.03);
        }

        .data-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .interactive-row {
          transition: background 180ms ease, transform 180ms ease;
        }

        .interactive-row:hover {
          background: rgba(36, 50, 74, 0.04);
        }

        .artwork-upload-row {
          display: flex;
          gap: 18px;
          align-items: center;
          flex-wrap: wrap;
        }

        .artwork-form-preview,
        .artwork-form-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 18px;
        }

        .artwork-form-preview {
          object-fit: cover;
          box-shadow: 0 14px 24px rgba(36, 50, 74, 0.12);
        }

        .artwork-form-placeholder {
          display: grid;
          place-items: center;
          background: rgba(36, 50, 74, 0.06);
          color: var(--muted);
          font-size: 0.9rem;
        }

        .artwork-thumb-wrap {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .artwork-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 10px 18px rgba(36, 50, 74, 0.12);
        }

        .artwork-hover-preview {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          width: 160px;
          padding: 8px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 18px 34px rgba(21, 32, 53, 0.18);
          transform: translateY(-50%) scale(0.96);
          opacity: 0;
          pointer-events: none;
          transition: opacity 180ms ease, transform 180ms ease;
          z-index: 5;
        }

        .artwork-hover-preview img {
          width: 100%;
          display: block;
          border-radius: 12px;
        }

        .interactive-row:hover .artwork-hover-preview {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }

        .table-action {
          border: 0;
          background: rgba(36, 50, 74, 0.08);
          color: var(--ink);
          border-radius: 12px;
          padding: 10px 12px;
          cursor: pointer;
          font-weight: 700;
          transition: background 180ms ease, transform 180ms ease;
        }

        .table-action:hover {
          transform: translateY(-1px);
          background: rgba(36, 50, 74, 0.12);
        }

        .table-action.danger {
          background: rgba(255, 123, 82, 0.12);
          color: #b54f2b;
        }

        .table-action.edit {
          color: var(--gold-deep);
        }

        .table-action-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .empty-state-card {
          display: grid;
          gap: 12px;
          place-items: center;
          text-align: center;
          padding: 34px 26px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 24px 40px rgba(21, 32, 53, 0.08);
        }

        .empty-state-card strong {
          font-size: 1.1rem;
        }

        .empty-state-card p {
          max-width: 460px;
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .empty-state-illustration {
          position: relative;
          width: 110px;
          height: 110px;
        }

        .empty-state-illustration span {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(217, 175, 55, 0.7), rgba(63, 74, 148, 0.35));
        }

        .empty-state-illustration span:nth-child(1) {
          width: 84px;
          height: 84px;
          inset: 14px auto auto 12px;
        }

        .empty-state-illustration span:nth-child(2) {
          width: 34px;
          height: 34px;
          top: 10px;
          right: 8px;
        }

        .empty-state-illustration span:nth-child(3) {
          width: 22px;
          height: 22px;
          bottom: 8px;
          right: 24px;
        }

        .filter-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .new-row {
          background: rgba(217, 175, 55, 0.08);
        }

        .row-chip,
        .request-meta {
          display: inline-block;
          color: var(--muted);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .row-chip {
          margin-left: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(217, 175, 55, 0.18);
          color: var(--gold-deep);
          font-weight: 800;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .request-card,
        .remark-card {
          display: grid;
          gap: 12px;
        }

        .request-card-top {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 12px;
        }

        .request-card p,
        .remark-card p,
        .detail-list-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .status-badge.pending,
        .status-badge.draft,
        .status-badge.processing {
          background: rgba(217, 175, 55, 0.16);
          color: #a07000;
        }

        .status-badge.approved,
        .status-badge.published,
        .status-badge.delivered {
          background: rgba(29, 155, 97, 0.14);
          color: #13734a;
        }

        .status-badge.rejected {
          background: rgba(255, 123, 82, 0.14);
          color: #b54f2b;
        }

        .status-badge.in-transit {
          background: rgba(63, 74, 148, 0.14);
          color: #34418d;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          font-size: 1.1rem;
          color: rgba(36, 50, 74, 0.18);
        }

        .rating-stars .filled {
          color: var(--gold);
        }

        .expanded-row td {
          background: rgba(36, 50, 74, 0.03);
        }

        .expanded-order-card {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding: 6px 0;
        }

        .expanded-order-card strong,
        .detail-card strong,
        .detail-list-card strong {
          display: block;
          margin-top: 6px;
          line-height: 1.5;
        }

        .detail-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 26;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(15, 18, 24, 0.5);
          backdrop-filter: blur(6px);
        }

        .detail-modal {
          width: min(720px, 100%);
          padding: 24px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 34px 64px rgba(12, 18, 30, 0.28);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 20px;
        }

        .detail-card,
        .detail-list-card {
          padding: 18px;
          border-radius: 20px;
          background: rgba(36, 50, 74, 0.04);
        }

        .detail-list-card {
          margin-top: 14px;
        }

        .detail-list {
          margin: 10px 0 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.7;
        }

        .toast-stack {
          position: fixed;
          top: 22px;
          right: 22px;
          z-index: 60;
          display: grid;
          gap: 10px;
        }

        .toast-item {
          min-width: 240px;
          max-width: 340px;
          padding: 14px 16px;
          border-radius: 16px;
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 18px 28px rgba(21, 32, 53, 0.18);
          animation: sectionReveal 220ms ease;
        }

        .toast-item.success {
          background: linear-gradient(135deg, #24324a, #4258a8);
        }

        .toast-item.info {
          background: linear-gradient(135deg, #d2a92f, #e4bd42);
        }

        .logged-out-screen {
          position: relative;
          z-index: 1;
          width: 100%;
          display: grid;
          place-items: center;
        }

        .logged-out-card {
          width: min(520px, 100%);
          padding: 34px 28px;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 30px 60px rgba(21, 32, 53, 0.12);
          text-align: center;
        }

        .logged-out-card h1 {
          margin: 6px 0 12px;
          font-size: clamp(2rem, 4vw, 3rem);
          font-family: Baskerville, "Palatino Linotype", "Book Antiqua", serif;
          font-weight: 500;
        }

        .logged-out-card p {
          margin: 0 auto 20px;
          max-width: 420px;
          color: var(--muted);
          line-height: 1.7;
        }

        .footer-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          color: var(--muted);
          font-size: 0.92rem;
        }

        @media (max-width: 1080px) {
          .content-grid,
          .analytics-grid,
          .card-row,
          .profile-info-grid,
          .profile-hero-card,
          .image-step,
          .review-hero,
          .module-grid,
          .detail-grid,
          .expanded-order-card {
            grid-template-columns: 1fr;
          }

          .signal-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .app-shell {
            padding: 14px 14px 24px;
          }

          .hero {
            padding: 24px 16px 18px;
            border-radius: 24px;
            min-height: auto;
          }

          .hero-divider {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .hero-divider::before,
          .hero-divider::after {
            display: none;
          }

          .section-heading,
          .topbar,
          .analytics-topbar,
          .panel-topline,
          .footer-line,
          .profile-modal-header,
          .profile-modal-actions,
          .profile-modal-actions-right,
          .filter-row {
            align-items: start;
            flex-direction: column;
          }

          .signal-row {
            grid-template-columns: 1fr;
          }

          .profile-form-grid,
          .review-grid {
            grid-template-columns: 1fr;
          }

          .basic-info .profile-facts {
            grid-template-columns: 1fr;
          }

          .document-grid {
            grid-template-columns: 1fr;
          }

          .sidebar,
          .analytics-panel,
          .chart-panel,
          .insight-panel {
            padding-left: 16px;
            padding-right: 16px;
          }

          .profile-modal {
            padding: 20px 16px;
          }

          .toast-stack {
            left: 14px;
            right: 14px;
            top: 14px;
          }

          .toast-item {
            min-width: 0;
            max-width: none;
          }
        }
      `;
