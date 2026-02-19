import NewsCard from './NewsCard';

export default function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="empty-state">
        <h3>No records found</h3>
        <p>
          We couldn’t find any articles matching your filters.
          <br />
          Try adjusting keywords, date, or source.
        </p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

