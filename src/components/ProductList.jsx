import ProductCard from "./ProductCard";

export default function ProductList({ products = [], onSelect, loading }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={() => onSelect(p.id)} />
      ))}

      {loading &&
        Array.from({ length: 6 }).map((_, i) => (
          <div className="card skeleton" key={i}></div>
        ))}
    </div>
  );
}
