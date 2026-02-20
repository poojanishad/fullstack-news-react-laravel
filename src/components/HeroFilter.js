import React from "react";

export default function HeroFilter({
  filters,
  meta,
  onChange,
  onSavePreference,
  onClearPreference,
}) {
  const toggleItem = (field, value) => {
    if (!value) return;

    const current = filters[field];

    if (current.includes(value)) {
      onChange({
        ...filters,
        [field]: current.filter((v) => v !== value),
      });
    } else {
      onChange({
        ...filters,
        [field]: [...current, value],
      });
    }
  };

  const removeItem = (field, value) => {
    onChange({
      ...filters,
      [field]: filters[field].filter((v) => v !== value),
    });
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Find the Perfect News for You</h1>
        <p>Search and filter by source, author, category & date</p>

        <div className="filter-box">
          <input
            type="text"
            placeholder="Search title..."
            value={filters.search}
            onChange={(e) =>
              onChange({ ...filters, search: e.target.value })
            }
          />

          <select
            value={filters.sources[0] || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                sources: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">All Sources</option>
            {meta.sources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          <select class="selectCompact"
            value={filters.authors[0] || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                authors: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">All Authors</option>
            {meta.authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange({ ...filters, date: e.target.value })
            }
          />

          <button className="btn-save" onClick={onSavePreference}>
            Save Preference
          </button>

          <button className="btn-clear" onClick={onClearPreference}>
            Clear
          </button>
        </div>

        <div className="selected-chips">
          {filters.sources.map((src) => (
            <span key={src} className="chip">
              {src}
              <button onClick={() => removeItem("sources", src)}>×</button>
            </span>
          ))}

          {filters.authors.map((author) => (
            <span key={author} className="chip">
              {author}
              <button onClick={() => removeItem("authors", author)}>×</button>
            </span>
          ))}
        </div>

        <div className="category-pills">
          {meta.categories?.map((cat) => (
            <button
              key={cat}
              className={
                filters.categories.includes(cat) ? "active" : ""
              }
              onClick={() => toggleItem("categories", cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}