export default function PostLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-12">
      <div className="mb-6 h-10 w-32 animate-pulse rounded-full bg-gray-200" />
      <div className="space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded bg-gray-100" />
        ))}
      </div>
    </main>
  );
}