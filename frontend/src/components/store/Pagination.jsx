import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3 text-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        className="p-2 rounded-lg hover:bg-gray-100"
        aria-label="Previous page"
        disabled={page <= 1}
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg border text-xs font-semibold transition ${
              p === page ? "bg-black text-white border-black" : "bg-white text-gray-900 border-gray-200 hover:border-gray-300"
            }`}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="p-2 rounded-lg hover:bg-gray-100"
        aria-label="Next page"
        disabled={page >= totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

