export default function NewsCard({ article }) {

const formatDate = (dateString) => {
  if (!dateString) return '';

  // Always take first 10 characters (YYYY-MM-DD)
  const datePart = dateString.substring(0, 10);

  const [year, month, day] = datePart.split('-');

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
            Date: {formatDate(article.published_at)}
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
