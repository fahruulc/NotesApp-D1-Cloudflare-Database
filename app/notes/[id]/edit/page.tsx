import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/prisma";
import { updateNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";
import { ArrowLeftIcon } from "@/components/Icons";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditNotePageProps): Promise<Metadata> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id) || id <= 0) {
    return { title: "Catatan Tidak Ditemukan" };
  }

  const db = await getDb();
  const note = await db.note.findUnique({
    where: { id },
    select: { title: true },
  });

  if (!note) {
    return { title: "Catatan Tidak Ditemukan" };
  }

  return {
    title: `Edit: ${note.title}`,
    description: `Ubah catatan: ${note.title}`,
  };
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
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Back Link */}
      <div>
        <Link
          href={`/notes/${note.id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Detail Catatan</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Edit Catatan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Perbarui judul atau isi catatan. Perubahan akan disimpan langsung ke Cloudflare D1.
          </p>
        </div>

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
