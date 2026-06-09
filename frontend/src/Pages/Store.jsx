import { useMemo, useState } from "react";
import FloatingToolbar from "../components/FloatingBar/FloatingtoolBar";
import AssetGrid from "../components/store/AssetGrid";
import ChipBar from "../components/store/ChipBar";
import OfferCard from "../components/store/OfferCard";
import Pagination from "../components/store/Pagination";
import SectionHeader from "../components/store/SectionHeader";
import StoreSearchBar from "../components/store/StoreSearchBar";

const OFFER_FEATURES = [
  "Social Media Page Management",
  "Advertisement/Promotions",
  "Graphics Posts",
  "Planning and Strategy",
  "Monthly Reporting",
  "Competitor Analysis",
  "Organic Promotion",
];

const ASSETS = [
  { id: "a1", title: "Colorful boards", category: "Brochures", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80" },
  { id: "a2", title: "3D blocks", category: "Mockup", imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=80" },
  { id: "a3", title: "Presentation stage", category: "Business Card", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80" },
  { id: "a4", title: "Icon set", category: "Flyer", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80" },
  { id: "a5", title: "Workshop screen", category: "Brochures", imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" },
  { id: "a6", title: "Glass object", category: "Valentine Day", imageUrl: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0d?w=1200&q=80" },
  { id: "a7", title: "Conference", category: "Brochures", imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=80" },
  { id: "a8", title: "Yellow watch", category: "Valentine Day", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80" },
  { id: "a9", title: "Sketch sheet", category: "Mockup", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80" },
  { id: "a10", title: "Crowd and stage", category: "Business Card", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&sig=2" },
  { id: "a11", title: "Simple product", category: "Flyer", imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=80&sig=3" },
  { id: "a12", title: "UI board", category: "Mockup", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&sig=4" },
];

const CATEGORIES = ["Brochures", "Business Card", "Mockup", "Flyer", "Valentine Day"];

export default function Store() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  const itemsPerPage = 9;

  const topPick = useMemo(() => ASSETS.slice(0, 9), []);

  const categoryItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = ASSETS.filter((a) => a.category === category);
    if (!q) return base;
    return base.filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(categoryItems.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return categoryItems.slice(start, start + itemsPerPage);
  }, [categoryItems, currentPage]);

  return (
    <main className="pt-16 bg-white">
      <section className="bg-black px-4 py-5">
        <div className="max-w-6xl mx-auto">
          <StoreSearchBar value={query} onChange={(v) => (setQuery(v), setPage(1))} />
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OfferCard
            title="OFFER"
            features={OFFER_FEATURES}
            price={12}
            variant="compact"
            onAddToCart={() => {}}
          />
          <div className="lg:col-span-2">
            <OfferCard
              title="OFFER"
              features={OFFER_FEATURES.filter((_, i) => i < 6)}
              price={12}
              variant="wide"
              imageUrl="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80"
              onAddToCart={() => {}}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader kicker="Top Pick" title="Assets for your project or brands." />
          <div className="mt-5">
            <AssetGrid items={topPick} onItemClick={() => {}} />
          </div>

          <div className="mt-8">
            <ChipBar
              items={CATEGORIES}
              value={category}
              onChange={(v) => {
                setCategory(v);
                setPage(1);
              }}
            />
          </div>

          <div className="mt-6">
            <Pagination page={currentPage} totalPages={Math.min(5, totalPages)} onChange={setPage} />
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div>
            <SectionHeader kicker="Top Category" title={category} subtitle="Filtered results from your selection." />
            <div className="mt-5">
              <AssetGrid items={paged} onItemClick={() => {}} />
            </div>
          </div>

          <div>
            <SectionHeader kicker="Top Pick" title="Recommended" subtitle="A few items we think you will like." />
            <div className="mt-5">
              <AssetGrid items={ASSETS.slice(6, 9)} onItemClick={() => {}} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <FloatingToolbar />
        </div>
      </section>

    </main>
  );
}

