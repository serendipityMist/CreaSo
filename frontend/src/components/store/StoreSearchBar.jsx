import { Search } from "lucide-react";

export default function StoreSearchBar({ value, onChange, placeholder = "Search Here..." }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full bg-white px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-yellow-500/30"
          aria-label="Search store items"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500">
          <Search size={18} />
        </div>
      </div>
    </div>
  );
}

