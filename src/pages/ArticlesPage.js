import { useState, useEffect } from "react";
import api from "../api/axios";
import HeroFilter from "../components/HeroFilter";
import NewsGrid from "../components/NewsGrid";
import useArticles from "../hooks/useArticles";
import "../styles/news.css";

export default function ArticlesPage() {
  const [filters, setFilters] = useState({
    search: "",
    sources: [],
    authors: [],
    categories: [],
    date: "",
  });

  const [filterMeta, setFilterMeta] = useState({
    sources: [],
    authors: [],
    categories: [],
  });

  const {
    articles,
    meta: pagination,
    loading,
    fetchArticles,
  } = useArticles(filters);

  useEffect(() => {
    const loadMeta = async () => {
      const res = await api.get("/articles/meta");
      setFilterMeta(res.data);
    };
    loadMeta();
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [filters]);

  const handleSavePreference = async () => {
    await api.post("/preferences", {
      sources: filters.sources,
      categories: filters.categories,
      authors: filters.authors,
    });
    alert("Preference Saved");
  };

  const handleClearPreference = async () => {
    await api.delete("/preferences");

    setFilters({
      search: "",
      sources: [],
      authors: [],
      categories: [],
      date: "",
    });
  };

  return (
    <div>
      <HeroFilter
        filters={filters}
        meta={filterMeta}
        onChange={setFilters}
        onSavePreference={handleSavePreference}
        onClearPreference={handleClearPreference}
      />

      {loading ? (
        <div className="empty-state">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <NewsGrid articles={articles} />

          {pagination?.last_page > 1 && (
            <div className="pagination-container">
              <button
                disabled={pagination.current_page === 1}
                onClick={() =>
                  fetchArticles(pagination.current_page - 1)
                }
              >
                Previous
              </button>

              <span>
                Page {pagination.current_page} of{" "}
                {pagination.last_page}
              </span>

              <button
                disabled={
                  pagination.current_page === pagination.last_page
                }
                onClick={() =>
                  fetchArticles(pagination.current_page + 1)
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}