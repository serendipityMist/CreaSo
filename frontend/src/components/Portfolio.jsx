export default function Portfolio() {
  return (
    <section className="py-20 px-12">
      <h2 className="text-3xl font-bold mb-8">Our Portfolio</h2>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-700 rounded-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </section>
  );
}
