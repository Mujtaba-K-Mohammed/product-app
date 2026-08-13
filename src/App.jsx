import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
} from "./api/products";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart"; // صفحة العربة الجديدة

import "./styles.css";
import Footer from "./components/Footer";

export default function App() {
  const PAGE_SIZE = 12;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categories, setCategories] = useState([]);

  // 🛒 سلة المشتريات الجديدة
  const [cart, setCart] = useState([]);

  // فتح/إغلاق صفحة العربة
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, query, category]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  async function loadCategories() {
    try {
      const cats = await fetchCategories();
      setCategories([{ slug: "all", name: "All" }, ...cats]);
    } catch {
      setCategories([{ slug: "all", name: "All" }]);
    }
  }

  async function loadProducts() {
    setLoading(true);
    setError(null);

    try {
      const skip = (page - 1) * PAGE_SIZE;
      const data = await fetchProducts({
        limit: PAGE_SIZE,
        skip,
        q: query,
        category,
      });

      let fetched = data.products || [];

      if (sort === "price-asc") fetched.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") fetched.sort((a, b) => b.price - a.price);

      setProducts(fetched);
      setTotal(data.total || fetched.length);
    } catch (err) {
      setError("حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  }

  // جلب تفاصيل المنتج
  async function loadProductDetails(id) {
    try {
      const data = await fetchProductById(id);
      setSelectedProduct(data);
    } catch {
      alert("فشل تحميل تفاصيل المنتج");
    }
  }

  // 🛒 إضافة للعربة
  function handleAddToCart(product, qty) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      }

      return [...prev, { ...product, qty }];
    });

    alert("تمت إضافة المنتج للعربة!");
  }

  // حذف منتج من العربة
  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // تعديل كمية منتج داخل العربة
  function handleUpdateQty(id, qty) {
    if (qty < 1) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  }

  return (
    <div className="app">
      {/* زر فتح العربة */}
      <Header onOpenCart={() => setShowCart(true)} />

      {/* صفحة العربة */}
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={handleRemove}
          onUpdateQty={handleUpdateQty}
        />
      )}

      <main className="container">
        <div className="controls">
          <SearchBar
            onSearch={(q) => {
              setPage(1);
              setQuery(q);
            }}
          />

          <Filters
            categories={categories}
            onCategory={(cat) => {
              setPage(1);
              setCategory(cat);
            }}
            onSort={(s) => setSort(s)}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <ProductList
          products={products}
          loading={loading}
          onSelect={(id) => loadProductDetails(id)}
        />

        <Pagination
          page={page}
          total={total}
          pageSize={PAGE_SIZE}
          onPage={(p) => setPage(p)}
        />

        {/* المودال */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {!loading && products.length === 0 && (
          <div className="empty">لا توجد نتائج</div>
        )}
      </main>

      <Footer />
    </div>
  );
}
