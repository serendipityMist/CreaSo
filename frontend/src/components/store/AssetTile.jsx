export default function AssetTile({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
    >
      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover aspect-[4/3] group-hover:scale-[1.03] transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="rounded-xl bg-white/90 backdrop-blur px-3 py-2 text-left">
          <p className="text-xs font-semibold text-gray-900 truncate">{item.title}</p>
          <p className="text-[10px] text-gray-600 truncate">{item.category}</p>
        </div>
      </div>
    </button>
  );
}

