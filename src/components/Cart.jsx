export default function Cart({ cart, onClose, onRemove, onUpdateQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>🛒 العربة</h2>

      {cart.length === 0 && <p>العربة فارغة</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-row">
          <img src={item.thumbnail} alt={item.title} />

          <div className="cart-info">
            <h3>{item.title}</h3>
            <p>${item.price * item.qty}</p>

            <div className="qty-controls">
              <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>
                -
              </button>
              <span>{item.qty}</span>
              <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>
                +
              </button>
            </div>

            <button className="remove-btn" onClick={() => onRemove(item.id)}>
              حذف
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && <h3 className="total">الإجمالي: ${total}</h3>}

      <button className="close-cart" onClick={onClose}>
        إغلاق
      </button>
    </div>
  );
}
