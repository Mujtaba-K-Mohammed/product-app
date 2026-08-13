export default function Pagination({ page, total, pageSize, onPage }) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        السابق
      </button>

      <span className="page-info">
        صفحة {page} من {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPage(page + 1)}
      >
        التالي
      </button>
    </div>
  );
}
