import type { Metadata } from "next";
import Link from "next/link";
import { createNote } from "@/app/actions";
import { NoteForm } from "@/components/NoteForm";
import { ArrowLeftIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Tulis Catatan Baru",
  description: "Buat catatan baru dan simpan ke Cloudflare D1",
};

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Daftar Catatan</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Buat Catatan Baru
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Isi judul dan detail catatanmu. Data akan langsung disimpan ke database Cloudflare D1.
          </p>
        </div>

        <NoteForm
          action={createNote}
          submitLabel="Simpan Catatan"
          cancelHref="/"
        />
      </div>
    </div>
  );
}
