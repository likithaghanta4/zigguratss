import React, { useState } from "react";
import { readFileAsDataUrl } from "../utils/storage";

function ArtworkSection({ items, onAddArtwork, onRemoveArtwork, showToast }) {
  const [showForm, setShowForm] = useState(items.length === 0);
  const [form, setForm] = useState({
    category: "Painting",
    type: "Original",
    name: "",
    image: "",
  });
  const [error, setError] = useState("");

  async function handleImageUpload(file) {
    if (!file) {
      return;
    }

    try {
      const image = await readFileAsDataUrl(file);
      setForm((current) => ({
        ...current,
        image,
      }));
      setError("");
    } catch (uploadError) {
      setError("Artwork image could not be uploaded. Please try again.");
    }
  }

  function resetForm() {
    setForm({
      category: "Painting",
      type: "Original",
      name: "",
      image: "",
    });
    setError("");
  }

  function handleAddArtwork() {
    if (!form.category.trim() || !form.type.trim() || !form.name.trim() || !form.image) {
      setError("Please complete the artwork form and upload an image before adding it.");
      return;
    }

    onAddArtwork({
      id: Date.now() + Math.random(),
      category: form.category.trim(),
      type: form.type.trim(),
      name: form.name.trim(),
      image: form.image,
    });
    resetForm();
    setShowForm(false);
    showToast("Artwork added successfully.");
  }

  return (
    <section className="module-section">
      <div className="section-heading section-heading-spread">
        <div>
          <h3>My Artwork</h3>
          <p>
            Manage your portfolio inventory with artwork previews, hover interactions, and
            quick creation controls.
          </p>
        </div>

        <button type="button" className="profile-action primary" onClick={() => setShowForm(true)}>
          Add Artwork
        </button>
      </div>

      {showForm ? (
        <article className="module-card form-card">
          <div className="profile-form-grid module-form-grid">
            <label className="form-field animated-field">
              <span>Category</span>
              <input
                type="text"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                placeholder="Painting"
              />
            </label>

            <label className="form-field animated-field">
              <span>Type</span>
              <input
                type="text"
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                placeholder="Original"
              />
            </label>

            <label className="form-field form-field-full animated-field">
              <span>Artwork Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Enter artwork title"
              />
            </label>

            <div className="artwork-upload-row">
              <label className="upload-button">
                {form.image ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event.target.files?.[0] || null)} />
              </label>

              {form.image ? (
                <img src={form.image} alt="Artwork preview" className="artwork-form-preview" />
              ) : (
                <div className="artwork-form-placeholder">No preview yet</div>
              )}
            </div>

            <div className="module-action-row">
              <button type="button" className="profile-action secondary" onClick={() => {
                resetForm();
                setShowForm(false);
              }}>
                Cancel
              </button>
              <button type="button" className="profile-action primary" onClick={handleAddArtwork}>
                Save Artwork
              </button>
            </div>
          </div>

          {error ? <p className="inline-error">{error}</p> : null}
        </article>
      ) : null}

      {items.length > 0 ? (
        <div className="table-shell">
          <table className="data-table artwork-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Type</th>
                <th>Name</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="interactive-row">
                  <td>{item.category}</td>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                  <td>
                    <div className="artwork-thumb-wrap">
                      <img src={item.image} alt={item.name} className="artwork-thumb" />
                      <div className="artwork-hover-preview">
                        <img src={item.image} alt={`${item.name} enlarged preview`} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-action danger"
                      onClick={() => {
                        onRemoveArtwork(item.id);
                        showToast("Artwork removed from your list.", "info");
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-state-illustration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>No artwork has been added yet.</strong>
          <p>
            Start by adding your first artwork to populate the portfolio table and preview
            interactions.
          </p>
        </div>
      )}
    </section>
  );
}

export default ArtworkSection;
