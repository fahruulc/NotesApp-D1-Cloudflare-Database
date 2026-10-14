export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Memuat catatan...">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-xl" />
          <div className="h-4 w-72 bg-slate-100 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-48 bg-slate-100 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 rounded-xl hidden sm:block" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-4 shadow-2xs"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-slate-100 rounded-md" />
              <div className="h-4 w-12 bg-slate-100 rounded-full" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-100 rounded-md" />
              <div className="h-3.5 w-5/6 bg-slate-100 rounded-md" />
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-3 w-16 bg-slate-100 rounded-md" />
              <div className="h-6 w-6 bg-slate-100 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
