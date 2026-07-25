import React, { useState } from "react";
import StatusBadge from "./StatusBadge";

function BlogSection({ blogs, onAddBlog, onDeleteBlog, showToast }) {
  const [showComposer, setShowComposer] = useState(blogs.length === 0);
  const [form, setForm] = useState({
    title: "",
    status: "Draft",
  });
  const [error, setError] = useState("");

  function handleCreateBlog() {
    if (!form.title.trim()) {
      setError("Please add a blog title before creating the entry.");
      return;
    }

    onAddBlog({
      id: Date.now() + Math.random(),
      title: form.title.trim(),
      status: form.status,
      updatedAt: "2026-04-22",
    });
    setForm({
      title: "",
      status: "Draft",
    });
    setShowComposer(false);
    setError("");
    showToast("Blog entry created successfully.");
  }

  return (
    <section className="module-section">
      <div className="section-heading section-heading-spread">
        <div>
          <h3>Blog</h3>
          <p>
            Create and manage blog entries with a simple composer and a cleaner empty-state
            experience.
          </p>
        </div>

        <button type="button" className="profile-action primary" onClick={() => setShowComposer(true)}>
          Create Blog
        </button>
      </div>

      {showComposer ? (
        <article className="module-card form-card">
          <div className="profile-form-grid module-form-grid">
            <label className="form-field form-field-full animated-field">
              <span>Blog Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => {
                  setForm((current) => ({ ...current, title: event.target.value }));
                  setError("");
                }}
                placeholder="Enter blog title"
              />
            </label>

            <label className="form-field animated-field">
              <span>Status</span>
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </label>
          </div>

          {error ? <p className="inline-error">{error}</p> : null}

          <div className="module-action-row blog-action-row">
            <button type="button" className="profile-action secondary" onClick={() => setShowComposer(false)}>
              Cancel
            </button>
            <button type="button" className="profile-action primary" onClick={handleCreateBlog}>
              Save Blog
            </button>
          </div>
        </article>
      ) : null}

      {blogs.length > 0 ? (
        <div className="table-shell">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="interactive-row">
                  <td>{blog.title}</td>
                  <td><StatusBadge status={blog.status} /></td>
                  <td>{blog.updatedAt}</td>
                  <td>
                    <button
                      type="button"
                      className="table-action danger"
                      onClick={() => {
                        onDeleteBlog(blog.id);
                        showToast("Blog removed.", "info");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-state-illustration blog-illustration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>No blog posts yet.</strong>
          <p>Create your first article to start building the blog section.</p>
        </div>
      )}
    </section>
  );
}

export default BlogSection;
