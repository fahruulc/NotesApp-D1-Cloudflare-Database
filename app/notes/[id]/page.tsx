import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/prisma";
import { DeleteButton } from "@/components/DeleteButton";
import {
  ArrowLeftIcon,
  EditIcon,
  CalendarIcon,
  ClockIcon,
  NoteIcon,
} from "@/components/Icons";

interface NoteDetailPageProps {
  params: Promise<{ id: string }>;
}

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

export async function generateMetadata({
  params,
}: NoteDetailPageProps): Promise<Metadata> {
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
    title: note.title,
    description: `Detail catatan: ${note.title}`,
  };
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

  const wordCount = note.content
    ? note.content.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const isUpdated = note.updatedAt.getTime() - note.createdAt.getTime() > 1000;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar: Navigation & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/"
          id="btn-back-home"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Daftar Catatan</span>
        </Link>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link
            href={`/notes/${note.id}/edit`}
            id="btn-edit-note"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
          >
            <EditIcon className="w-4 h-4 text-slate-500" />
            <span>Edit</span>
          </Link>
          <DeleteButton noteId={note.id} />
        </div>
      </div>

      {/* Main Card */}
      <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <header className="border-b border-slate-100 pb-6 space-y-3">
          <h1
            id="note-title-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 break-words leading-tight"
          >
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Dibuat: {formatDate(note.createdAt)}</span>
            </span>

            {isUpdated && (
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Diperbarui: {formatDate(note.updatedAt)}</span>
              </span>
            )}

            {wordCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                {wordCount} kata &bull; {note.content.length} karakter
              </span>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="prose max-w-none">
          {note.content ? (
            <div
              id="note-content-body"
              className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-slate-800"
            >
              {note.content}
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-slate-400 space-y-1">
              <NoteIcon className="w-6 h-6 mx-auto text-slate-300" />
              <p className="text-sm italic">
                Catatan ini tidak memiliki isi tambahan.
              </p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
