const BASE = "https://dummyjson.com";

export async function fetchProducts({
  limit = 12,
  skip = 0,
  q = "",
  category = "",
} = {}) {
  try {
    let url = "";

    // البحث بالكلمة
    if (q) {
      const params = new URLSearchParams({ q, limit, skip });
      url = `${BASE}/products/search?${params.toString()}`;
    }

    // الفئة (category) — الآن نرسل الـ slug مباشرة
    else if (category && category !== "all") {
      const params = new URLSearchParams({ limit, skip });
      url = `${BASE}/products/category/${category}?${params.toString()}`;
    }

    // كل المنتجات
    else {
      const params = new URLSearchParams({ limit, skip });
      url = `${BASE}/products?${params.toString()}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
