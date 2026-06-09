import { Play } from "lucide-react";

function OfferFeatureList({ items }) {
  return (
    <ul className="mt-2 text-xs text-gray-800 list-disc list-inside space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function OfferCard({
  title = "OFFER",
  features,
  price = 12,
  imageUrl,
  variant = "compact",
  onAddToCart,
}) {
  const isWide = variant === "wide";

  return (
    <div className="rounded-xl border-2 border-black bg-white p-4 md:p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className={`grid gap-4 ${isWide ? "grid-cols-1 md:grid-cols-[220px_1fr]" : "grid-cols-1"}`}>
        {isWide && imageUrl ? (
          <div className="rounded-lg overflow-hidden border border-black/10 bg-gray-100">
            <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : null}

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black tracking-wide">{title}</h3>
            <OfferFeatureList items={features} />
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <button
              type="button"
              onClick={onAddToCart}
              className="inline-flex items-center gap-2 rounded-lg border border-black px-3 py-2 text-xs font-semibold hover:bg-black hover:text-white transition"
            >
              Add To Cart
              <span className="inline-flex items-center justify-center w-7 h-6 rounded-md border border-black/20 bg-white text-black group-hover:text-white">
                <Play size={14} className="translate-x-[1px]" />
              </span>
            </button>

            <div className="text-right">
              <p className="text-[10px] text-gray-600">From</p>
              <p className="text-2xl font-black">${Number(price).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

