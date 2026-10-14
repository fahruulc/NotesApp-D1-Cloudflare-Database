import Link from "next/link";
import { getDb } from "@/lib/prisma";

function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return new Date(date).toLocaleString();
  }
}

export default async function HomePage() {
  const db = await getDb();
  const notes = await db.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Daftar Catatan
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Semua catatan tersimpan di database Cloudflare D1
          </p>
        </div>
        <Link
          href="/notes/new"
          id="btn-create-note-hero"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm active:scale-95 sm:w-auto w-full"
        >
          <span>✍️</span>
          <span>Tulis Catatan Baru</span>
        </Link>
      </div>

      {notes.length === 0 ? (
        <div
          id="empty-state-card"
          className="text-center py-16 px-4 bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl space-y-4"
        >
          <div className="text-5xl">📓</div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Belum Ada Catatan
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Kamu belum membuat catatan apa pun. Buat catatan pertamamu sekarang!
            </p>
          </div>
          <Link
            href="/notes/new"
            id="btn-empty-state-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            <span>+ Catatan Pertama</span>
          </Link>
        </div>
      ) : (
        <div
          id="notes-grid"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              id={`note-card-${note.id}`}
              className="group block p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition duration-150 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-2">
                  {note.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {note.content ? note.content : (
                    <span className="italic text-neutral-400 dark:text-neutral-500">
                      (Tidak ada isi tambahan)
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                <span>{formatDate(note.createdAt)}</span>
                <span className="group-hover:translate-x-1 transition text-blue-500">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
