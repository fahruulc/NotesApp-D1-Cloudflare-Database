export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Memuat catatan...">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="h-4 w-72 bg-neutral-100 dark:bg-neutral-800/60 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3"
          >
            <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-neutral-100 dark:bg-neutral-800/60 rounded-sm" />
              <div className="h-3.5 w-5/6 bg-neutral-100 dark:bg-neutral-800/60 rounded-sm" />
            </div>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex justify-between">
              <div className="h-3 w-20 bg-neutral-100 dark:bg-neutral-800/60 rounded-sm" />
              <div className="h-3 w-4 bg-neutral-100 dark:bg-neutral-800/60 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
