import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/prisma";
import { DeleteButton } from "@/components/DeleteButton";

function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return new Date(date).toLocaleString();
  }
}

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const db = await getDb();
  const note = await db.note.findUnique({
    where: { id },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          id="btn-back-home"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
          <span>&larr;</span>
          <span>Kembali ke Daftar</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/notes/${note.id}/edit`}
            id="btn-edit-note"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <span>✏️</span>
            <span>Edit</span>
          </Link>
          <DeleteButton noteId={note.id} />
        </div>
      </div>

      <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <header className="border-b border-neutral-100 dark:border-neutral-800 pb-5 space-y-2">
          <h1
            id="note-title-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 break-words"
          >
            {note.title}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 dark:text-neutral-500">
            <span>Dibuat: {formatDate(note.createdAt)}</span>
            {note.updatedAt.getTime() !== note.createdAt.getTime() && (
              <span>&bull; Diperbarui: {formatDate(note.updatedAt)}</span>
            )}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          {note.content ? (
            <div
              id="note-content-body"
              className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200"
            >
              {note.content}
            </div>
          ) : (
            <p className="italic text-neutral-400 dark:text-neutral-500 text-sm">
              (Catatan ini tidak memiliki isi tambahan)
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
