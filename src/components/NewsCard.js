export default function NewsCard({ article }) {

  const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

if (!article || article.length === 0) {
  return (
    <div >
      <h2>No results found</h2>
      <p>
        We couldn’t find any articles matching your search and filters.
        <br />
        Try refining your keywords, changing the date, or selecting a different source.
      </p>
    </div>
  );
}

if (article) {
  return (
    <article className="news-card">
      {article.image_url && (
        <div className="image-wrapper">
          <img src={article.image_url} alt={article.title} />
        </div>
      )}

      <div className="content">
        <span className="category">{article.category}</span>
        <h2>{article.title}</h2>
        <p>{article.description}</p>

        <div className="meta">
          <span>{article.source}</span>
          <span className="date">
            Date: {formatDate(article.publishedAt || article.created_at)}
          </span>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read →
          </a>
        </div>
      </div>
    </article>
  );
}
}
