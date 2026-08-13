export default function Filters({ categories = [], onCategory, onSort }) {
  return (
    <div className="filters">
      <div className="filter-item">
        <label>الفئة</label>
        <select onChange={(e) => onCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label>ترتيب</label>
        <select onChange={(e) => onSort(e.target.value)}>
          <option value="">الأفضل</option>
          <option value="price-asc">السعر: من الأقل</option>
          <option value="price-desc">السعر: من الأعلى</option>
        </select>
      </div>
    </div>
  );
}
