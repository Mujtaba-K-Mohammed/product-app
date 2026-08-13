import { useState } from "react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [qty, setQty] = useState(1);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <img
            className="main-img"
            src={product.thumbnail}
            alt={product.title}
          />

          <h2>{product.title}</h2>

          <p className="brand">
            {product.brand} • {product.category}
          </p>

          <p className="desc">{product.description}</p>

          {/* السعر حسب الكمية */}
          <div className="price-rating">
            <span className="price">${product.price * qty}</span>
            <span className="rating">⭐ {product.rating}</span>
          </div>

          {/* اختيار الكمية */}
          <div className="qty-box">
            <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* زر إضافة للعربة */}
          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product, qty)}
          >
            Add to Cart
          </button>

          <div className="gallery">
            {product.images?.map((img, i) => (
              <img key={i} src={img} alt="gallery" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
