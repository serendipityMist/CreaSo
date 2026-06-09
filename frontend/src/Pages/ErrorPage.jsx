import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const title = "Something went wrong";
  const details = (() => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    }
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    return "An unexpected error occurred while rendering this route.";
  })();

  return (
    <main className="pt-16 bg-white">
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500">Error</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">{title}</h1>
          <p className="mt-3 text-sm text-gray-600">{details}</p>
          <div className="mt-8 flex items-center gap-3">
            <Link to="/" className="rounded-xl bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-gray-900 transition">
              Go home
            </Link>
            <Link to="/contact" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition">
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

