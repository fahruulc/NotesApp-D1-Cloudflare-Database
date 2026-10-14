import { notFound } from "next/navigation";
import { getDb } from "@/lib/prisma";
import { updateNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNotePage({ params }: EditNotePageProps) {
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

  const updateActionWithId = updateNote.bind(null, note.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Edit Catatan
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Ubah judul atau isi catatan di bawah ini.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
        <NoteForm
          action={updateActionWithId}
          initialData={{
            title: note.title,
            content: note.content,
          }}
          submitLabel="Perbarui Catatan"
          cancelHref={`/notes/${note.id}`}
        />
      </div>
    </div>
  );
}
