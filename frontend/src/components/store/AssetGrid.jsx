import AssetTile from "./AssetTile";

export default function AssetGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map((item) => (
        <AssetTile key={item.id} item={item} onClick={() => onItemClick?.(item)} />
      ))}
    </div>
  );
}

