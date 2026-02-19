import { useState, useEffect } from "react";
import api from "../api/axios";
import HeroFilter from "../components/HeroFilter";
import NewsGrid from "../components/NewsGrid";
import useArticles from "../hooks/useArticles";
import "../styles/news.css";

export default function ArticlesPage() {

  const [filters, setFilters] = useState({
    search: "",
    source: "",
    category: "",
    date: "",
  });

  // 🔹 Dropdown Meta (Sources, Authors, Categories)
  const [filterMeta, setFilterMeta] = useState({
    sources: [],
    authors: [],
    categories: []
  });

  // 🔹 Articles Hook
  const {
    articles,
    meta: pagination,
    loading,
    fetchArticles
  } = useArticles(filters);

  // -------------------------
  // Load Preferences
  // -------------------------
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const res = await api.get("/preferences");

        if (res.data?.data) {
          setFilters(prev => ({
            ...prev,
            source: res.data.data.sources?.[0] || "",
            category: res.data.data.categories?.[0] || "",
          }));
        }
      } catch (error) {
        console.log("No saved preference");
      }
    };

    loadPreference();
  }, []);

  // -------------------------
  // Load Dropdown Meta
  // -------------------------
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const res = await api.get("/articles/meta");
        setFilterMeta(res.data);
      } catch (error) {
        console.error("Meta load failed");
      }
    };

    loadMeta();
  }, []);

  // -------------------------
  // Fetch Articles
  // -------------------------
  useEffect(() => {
    fetchArticles(1);
  }, [filters]);

  // -------------------------
  // Save Preference
  // -------------------------
  const handleSavePreference = async () => {
    try {
      await api.post("/preferences", {
        sources: filters.source ? [filters.source] : [],
        categories: filters.category ? [filters.category] : [],
        authors: [],
      });

      alert("Preference Saved");
    } catch (error) {
      console.error(error);
    }
  };

  // -------------------------
  // Clear Preference
  // -------------------------
  const handleClearPreference = async () => {
    try {
      await api.delete("/preferences");

      setFilters({
        search: "",
        source: "",
        category: "",
        date: "",
      });

      alert("Preference Cleared");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeroFilter
        filters={filters}
        meta={filterMeta} // 🔹 Pass dropdown meta
        onChange={setFilters}
        onSearch={() => fetchArticles(1)}
        onSavePreference={handleSavePreference}
        onClearPreference={handleClearPreference}
      />

      <div className="container mt-4">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <NewsGrid articles={articles} />
        )}

        {/* Pagination */}
        {pagination && (
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
              Page {pagination.current_page} of {pagination.last_page}
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

      </div>
    </>
  );
}
