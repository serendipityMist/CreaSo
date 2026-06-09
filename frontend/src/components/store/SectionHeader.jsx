export default function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="space-y-1">
      {kicker ? (
        <div className="flex items-center gap-2 text-gray-500">
          <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs font-semibold">{kicker}</span>
        </div>
      ) : null}
      {title ? <h2 className="text-sm font-semibold text-gray-900">{title}</h2> : null}
      {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
    </div>
  );
}

