import { useState, useCallback } from "react";
import api from "../api/axios";

export default function useArticles(filters) {

  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async (page = 1) => {
    setLoading(true);

    try {
      const res = await api.get("/articles", {
        params: {
          search: filters.search,
          source: filters.sources.join(","),
          author: filters.authors.join(","),
          category: filters.categories.join(","),
          date: filters.date,
          page,
        },
      });

      setArticles(res.data.data);
      setMeta(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return { articles, meta, loading, fetchArticles };
}