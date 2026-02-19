export default function HeroFilter({
  filters,
  meta,
  onChange,
  onSearch,
  onSavePreference,
  onClearPreference
}) {

  return (
    <section className="hero">
      <div className="hero-overlay">

        <h1>Find the Perfect News for You</h1>
        <p>Search articles by date, source, author and category</p>

        <div className="filter-box">

          {/* Search */}
          <input
            type="text"
            placeholder="Search title..."
            value={filters.search}
            onChange={(e) =>
              onChange({ ...filters, search: e.target.value })
            }
          />

          {/* Source Dropdown */}
          <select
            value={filters.source}
            onChange={(e) =>
              onChange({ ...filters, source: e.target.value })
            }
          >
            <option value="">All Sources</option>
            {meta?.sources?.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>

          {/* Author Dropdown */}
          <select
            value={filters.author || ""}
            onChange={(e) =>
              onChange({ ...filters, author: e.target.value })
            }
          >
            <option value="">All Authors</option>
            {meta?.authors?.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* Date */}
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

        {/* Category Pills */}
        <div className="category-pills">
          {meta?.categories?.map((cat) => (
            <button
              key={cat}
              className={filters.category === cat ? "active" : ""}
              onClick={() =>
                onChange({
                  ...filters,
                  category:
                    filters.category === cat ? "" : cat
                })
              }
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
