import { useMemo, useState } from "react";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const errors = useMemo(() => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isValidEmail(form.email)) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
    return e;
  }, [form.email, form.message, form.name]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "sending";

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onBlur = (key) => () => setTouched((prev) => ({ ...prev, [key]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;

    setStatus("sending");

    // No backend wired yet; keep it dev-friendly and deterministic.
    // You can replace this with a POST to your API when available.
    window.setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    }, 700);
  };

  return (
    <main className="pt-16 bg-white">
      <section className="px-4 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-500">Contact</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">Tell us what you are building</h1>
            <p className="mt-3 text-sm text-gray-600 max-w-xl">
              Share goals, timeline, and what you need help with. We will reply with a clear next step and a plan that fits.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Response time", value: "Within 24-48 hours" },
                { label: "Scope", value: "Brand, creative, ads, landing pages" },
                { label: "Deliverables", value: "Systems and repeatable templates" },
                { label: "Collaboration", value: "Transparent updates and revisions" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-gray-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={onChange("name")}
                    onBlur={onBlur("name")}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 ${touched.name && errors.name ? "border-red-400" : "border-gray-200"}`}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                  {touched.name && errors.name && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    value={form.email}
                    onChange={onChange("email")}
                    onBlur={onBlur("email")}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 ${touched.email && errors.email ? "border-red-400" : "border-gray-200"}`}
                    placeholder="you@company.com"
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                  {touched.email && errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="contact-company">
                  Company (optional)
                </label>
                <input
                  id="contact-company"
                  value={form.company}
                  onChange={onChange("company")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Company or brand name"
                  autoComplete="organization"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={onChange("message")}
                  onBlur={onBlur("message")}
                  className={`w-full min-h-36 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 ${touched.message && errors.message ? "border-red-400" : "border-gray-200"}`}
                  placeholder="What do you need help with? Goals, timeline, and any links are helpful."
                  required
                />
                {touched.message && errors.message && <p className="mt-2 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${canSubmit ? "bg-black text-white hover:bg-gray-900" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send message"}
                </button>
                {status === "sent" && <p className="text-sm text-green-700">Thanks. We will get back to you soon.</p>}
              </div>

              <p className="mt-5 text-xs text-gray-500">
                This form currently simulates sending (no backend). If you want, I can wire it to an API route in `backend/` next.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

