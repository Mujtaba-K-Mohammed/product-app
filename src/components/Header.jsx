export default function Header({ onOpenCart }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Product Explorer</h1>
        <p className="sub">تطبيق تجريبي يعرض منتجات DummyJSON</p>
      </div>

      <button className="cart-btn" onClick={onOpenCart}>
        🛒 العربة
      </button>
    </header>
  );
}
