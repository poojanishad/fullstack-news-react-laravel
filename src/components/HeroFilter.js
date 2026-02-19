export default function HeroFilter({ filters, onChange, onSearch }) {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Find the Perfect News for You</h1>
        <p>Search articles by title, source, and category</p>

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
            value={filters.source || 'All Sources'}
            onChange={(e) =>
              onChange({
                ...filters,
                source: e.target.value === 'All Sources' ? '' : e.target.value
              })
            }
          >
            <option value="All Sources">All Sources</option>
            <option value="NewsAPI">News API</option>
            <option value="GNews">G News</option>
            <option value="NewsData">News Data</option>
            <option value="TheGuardian">The Guardian</option>
          </select>
         

          <button onClick={onSearch}>Search</button>
        </div>

        <div className="category-pills">
          {['technology', 'business', 'politics', 'entertainment', 'News', 'Arts', 'education'].map(cat => (
            <button
              key={cat}
              className={filters.category === cat ? 'active' : ''}
              onClick={() =>
                onChange({
                  ...filters,
                  category: filters.category === cat ? '' : cat
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
