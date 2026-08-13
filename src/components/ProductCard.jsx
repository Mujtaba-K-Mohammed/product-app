export default function ProductCard({ product, onSelect }) {
  return (
    <div className="card" onClick={onSelect} role="button" tabIndex={0}>
      <div className="thumb-wrap">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="muted">
          {product.brand} • {product.category}
        </p>

        <div className="card-footer">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}
