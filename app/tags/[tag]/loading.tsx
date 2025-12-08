export default function TagLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <div className="mb-8 space-y-2">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-8 w-40 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-48 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
          </div>
        ))}
      </div>
    </main>
  );
}