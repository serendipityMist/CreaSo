import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="pt-16 bg-white">
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-gray-500">404</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">Page not found</h1>
          <p className="mt-3 text-sm text-gray-600">The page you are looking for does not exist (or the route has not been wired yet).</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/" className="rounded-xl bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-gray-900 transition">
              Go home
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

