import React, { useState, useEffect } from "react";
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

  const [meta, setMeta] = useState({
    sources: [],
    authors: [],
    categories: [],
  });

  const { articles, meta: pagination, loading, fetchArticles } =
    useArticles(filters);

  /* Load Saved Preferences */
  useEffect(() => {
    const loadPreference = async () => {
      try {
        const res = await api.get("/preferences");

        if (res.data.data) {
          setFilters((prev) => ({
            ...prev,
            sources: res.data.data.sources || [],
            authors: res.data.data.authors || [],
            categories: res.data.data.categories || [],
          }));
        }
      } catch (err) {
        console.log("No saved preference");
      }
    };

    loadPreference();
  }, []);

  /* Load Meta */
  useEffect(() => {
    const loadMeta = async () => {
      const res = await api.get("/articles/meta");
      setMeta(res.data);
    };
    loadMeta();
  }, []);

  /* Fetch Articles */
  useEffect(() => {
    fetchArticles(1);
  }, [filters]);

  /* Save Preference */
  const handleSavePreference = async () => {
    await api.post("/preferences", {
      sources: filters.sources,
      categories: filters.categories,
      authors: filters.authors,
    });

    alert("Preference Saved");
  };

  /* Clear Preference */
  const handleClearPreference = async () => {
    await api.delete("/preferences");

    setFilters({
      search: "",
      sources: [],
      authors: [],
      categories: [],
      date: "",
    });

    alert("Preference Cleared");
  };

  return (
    <>
      <HeroFilter
        filters={filters}
        meta={meta}
        onChange={setFilters}
        onSavePreference={handleSavePreference}
        onClearPreference={handleClearPreference}
      />

      <div className="app">
        <NewsGrid articles={articles} loading={loading} />
      </div>
    </>
  );
}