import { useState, useCallback } from "react";
import api from "../api/axios";

export default function useArticles(filters) {

  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async (page = 1) => {

    setLoading(true);

    try {
      const res = await api.get("/articles", {
        params: {
          ...filters,
          page: page,
        },
      });

      setArticles(res.data.data);

      setMeta({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        per_page: res.data.per_page,
        total: res.data.total,
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }, [filters]);

  return { articles, meta, loading, fetchArticles };
}
