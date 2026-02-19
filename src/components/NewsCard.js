export default function NewsCard({ article }) {
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
          <a href={article.url} target="_blank" rel="noreferrer">
            Read →
          </a>
        </div>
      </div>
    </article>
  );
}
