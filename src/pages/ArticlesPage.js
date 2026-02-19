import { useEffect, useState } from 'react';
import api from '../api/api';
import HeroFilter from '../components/HeroFilter';
import NewsGrid from '../components/NewsGrid';
import '../styles/news.css';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    source: '',
    category: ''
  });

  const fetchArticles = () => {
    api
      .get('/articles', { params: filters })
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, []);

  // Auto refresh when filters change
  useEffect(() => {
    fetchArticles();
  }, [filters]);

  return (
    <>
      <HeroFilter
        filters={filters}
        onChange={setFilters}
        onSearch={fetchArticles}
      />

      <div className="app">
        <NewsGrid articles={articles} />
      </div>
    </>
  );
}
