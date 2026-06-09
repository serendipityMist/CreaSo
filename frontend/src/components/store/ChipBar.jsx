export default function ChipBar({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((item) => {
        const active = item === value;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition border ${
              active ? "bg-black text-white border-black" : "bg-white text-gray-900 border-gray-200 hover:border-gray-300"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

