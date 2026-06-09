import { Link, useParams } from "react-router-dom";

const PROJECTS = [
  { id: "1", title: "Abstract Design", summary: "A visual exploration with bold gradients and strong type hierarchy." },
  { id: "2", title: "Brand Identity", summary: "A compact identity system with templates and consistent rules." },
  { id: "3", title: "Digital Art", summary: "A campaign look with flexible layouts and striking composition." },
  { id: "4", title: "Team Strategy", summary: "Messaging + layout that communicates clarity and momentum." },
  { id: "5", title: "Collaboration", summary: "Social assets designed for repeatable, multi-format output." },
  { id: "6", title: "Planning", summary: "A structured content system that scales week to week." },
  { id: "7", title: "Audio Visual", summary: "A creative direction designed for motion and performance." },
  { id: "8", title: "Mobile Design", summary: "Responsive UI blocks and a clean conversion path." },
  { id: "9", title: "Development", summary: "A landing system built for speed, clarity, and reuse." },
];

export default function PortfolioDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="pt-16 bg-white">
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs tracking-widest uppercase text-gray-500">Portfolio</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">Project not found</h1>
            <p className="mt-3 text-sm text-gray-600">This portfolio route is wired, but the project id does not exist.</p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/" className="rounded-xl bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-gray-900 transition">
                Back home
              </Link>
              <Link to="/contact" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16 bg-white">
      <section className="px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500">Portfolio</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">{project.title}</h1>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl">{project.summary}</p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <img
                src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80&sig=${encodeURIComponent(project.id)}`}
                alt={project.title}
                className="w-full h-[360px] object-cover"
              />
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-xs font-semibold text-gray-500">What we can deliver</p>
              <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-2">
                <li>Design direction and templates</li>
                <li>Ad creatives and variants</li>
                <li>Landing page sections and layout</li>
                <li>Export-ready assets</li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="rounded-xl bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-gray-900 transition text-center">
                  Request a similar project
                </Link>
                <Link to="/" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition text-center">
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

