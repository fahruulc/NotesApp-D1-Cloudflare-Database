import { createNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Buat Catatan Baru
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Tuliskan judul dan isi catatanmu. Judul wajib diisi.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs">
        <NoteForm
          action={createNote}
          submitLabel="Simpan Catatan"
          cancelHref="/"
        />
      </div>
    </div>
  );
}
