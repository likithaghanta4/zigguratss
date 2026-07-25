import React, { useState } from "react";

function AwardsAndExhibitionsSection({ entries, onAddEntry, showToast }) {
  const [openSections, setOpenSections] = useState({
    awards: true,
    solo: false,
    group: false,
  });
  const [forms, setForms] = useState({
    awards: { title: "", subtitle: "", year: "" },
    solo: { title: "", subtitle: "", year: "" },
    group: { title: "", subtitle: "", year: "" },
  });
  const [errors, setErrors] = useState({});
  const [editingEntry, setEditingEntry] = useState(null);

  const sections = [
    {
      key: "awards",
      title: "Awards & Prizes",
      titleLabel: "Award / Prize",
      subtitleLabel: "Presented By",
    },
    {
      key: "solo",
      title: "Solo Exhibitions",
      titleLabel: "Exhibition Name",
      subtitleLabel: "Venue / City",
    },
    {
      key: "group",
      title: "Group Exhibitions",
      titleLabel: "Exhibition Name",
      subtitleLabel: "Venue / City",
    },
  ];

  function updateForm(section, field, value) {
    setForms((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
    setErrors((current) => ({
      ...current,
      [section]: "",
    }));
  }

  function handleAdd(section, title) {
    const draft = forms[section];

    if (!draft.title.trim() || !draft.subtitle.trim() || !draft.year.trim()) {
      setErrors((current) => ({
        ...current,
        [section]: "Please complete all fields before adding a new entry.",
      }));
      return;
    }

    if (editingEntry && editingEntry.section === section) {
      onAddEntry(section, {
        id: editingEntry.id,
        title: draft.title.trim(),
        subtitle: draft.subtitle.trim(),
        year: draft.year.trim(),
      });
      setEditingEntry(null);
      showToast(`${title} entry updated successfully.`);
    } else {
      onAddEntry(section, {
        id: Date.now() + Math.random(),
        title: draft.title.trim(),
        subtitle: draft.subtitle.trim(),
        year: draft.year.trim(),
      });
      showToast(`${title} entry added successfully.`);
    }
    setForms((current) => ({
      ...current,
      [section]: { title: "", subtitle: "", year: "" },
    }));
    setErrors((current) => ({
      ...current,
      [section]: "",
    }));
  }

  function handleEdit(section, item) {
    setEditingEntry({ section, id: item.id });
    setForms((current) => ({
      ...current,
      [section]: {
        title: item.title,
        subtitle: item.subtitle,
        year: item.year,
      },
    }));
    setErrors((current) => ({
      ...current,
      [section]: "",
    }));
  }

  function handleDelete(section, itemId) {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    onAddEntry(section, { id: itemId, remove: true });
    showToast("Entry removed.", "info");
  }

  return (
    <section className="module-section">
      <div className="section-heading">
        <div>
          <h3>Add Awards And Exhibition</h3>
          <p>
            Capture your recognitions and exhibition history with collapsible sections and
            quick add actions.
          </p>
        </div>
      </div>

      <div className="module-stack">
        {sections.map((section) => (
          <article key={section.key} className="module-card accordion-card">
            <button
              type="button"
              className="accordion-toggle"
              onClick={() =>
                setOpenSections((current) => ({
                  ...current,
                  [section.key]: !current[section.key],
                }))
              }
            >
              <strong>{section.title}</strong>
              <span>{openSections[section.key] ? "Hide" : "Show"}</span>
            </button>

            {openSections[section.key] ? (
              <div className="accordion-body">
                <div className="profile-form-grid module-form-grid">
                  <label className="form-field animated-field">
                    <span>{section.titleLabel}</span>
                    <input
                      type="text"
                      value={forms[section.key].title}
                      onChange={(event) => updateForm(section.key, "title", event.target.value)}
                      placeholder={`Add ${section.titleLabel.toLowerCase()}`}
                    />
                  </label>

                  <label className="form-field animated-field">
                    <span>{section.subtitleLabel}</span>
                    <input
                      type="text"
                      value={forms[section.key].subtitle}
                      onChange={(event) => updateForm(section.key, "subtitle", event.target.value)}
                      placeholder={`Add ${section.subtitleLabel.toLowerCase()}`}
                    />
                  </label>

                  <label className="form-field animated-field">
                    <span>Year</span>
                    <input
                      type="text"
                      value={forms[section.key].year}
                      onChange={(event) => updateForm(section.key, "year", event.target.value)}
                      placeholder="2026"
                    />
                  </label>

                  <div className="module-action-row align-bottom">
                    <button
                      type="button"
                      className="profile-action primary"
                      onClick={() => handleAdd(section.key, section.title)}
                    >
                      {editingEntry && editingEntry.section === section.key ? "Save Changes" : "Add Entry"}
                    </button>
                    {editingEntry && editingEntry.section === section.key ? (
                      <button
                        type="button"
                        className="profile-action secondary"
                        onClick={() => {
                          setEditingEntry(null);
                          setForms((current) => ({
                            ...current,
                            [section.key]: { title: "", subtitle: "", year: "" },
                          }));
                          setErrors((current) => ({
                            ...current,
                            [section.key]: "",
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>

                {errors[section.key] ? <p className="inline-error">{errors[section.key]}</p> : null}

                {entries[section.key].length > 0 ? (
                  <div className="table-shell">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{section.titleLabel}</th>
                          <th>{section.subtitleLabel}</th>
                          <th>Year</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries[section.key].map((item) => (
                          <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.subtitle}</td>
                            <td>{item.year}</td>
                            <td>
                              <div className="table-action-group">
                                <button
                                  type="button"
                                  className="table-action edit"
                                  onClick={() => handleEdit(section.key, item)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="table-action danger"
                                  onClick={() => handleDelete(section.key, item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="inline-empty">No entries added in this section yet.</div>
                )}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default AwardsAndExhibitionsSection;
