"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SearchIcon,
  PlusIcon,
  CalendarIcon,
  ArrowRightIcon,
  EmptyNotesIcon,
  XIcon,
} from "@/components/Icons";

export interface NoteItem {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesListProps {
  notes: NoteItem[];
}

function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

export function NotesList({ notes }: NotesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        (n.content && n.content.toLowerCase().includes(q))
    );
  }, [notes, searchQuery]);

  // Overall empty database state
  if (notes.length === 0) {
    return (
      <div
        id="empty-state-card"
        className="text-center py-20 px-6 bg-white border border-slate-200 rounded-3xl shadow-xs max-w-xl mx-auto space-y-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-100">
          <EmptyNotesIcon className="w-8 h-8 text-blue-600" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-slate-900">
            Belum Ada Catatan
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Database catatanmu masih kosong. Mulai tulis ide, to-do list, atau ringkasan pertamamu sekarang.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/notes/new"
            id="btn-empty-state-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Tulis Catatan Pertama</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Bar: Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Daftar Catatan
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {notes.length} total
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Kelola dan cari seluruh catatan pribadi yang tersimpan di Cloudflare D1
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-72">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari catatan..."
              className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md transition"
                title="Hapus pencarian"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Link
            href="/notes/new"
            id="btn-create-note-hero"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Tulis Catatan</span>
          </Link>
        </div>
      </div>

      {/* Filtered Count indicator if searching */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Menampilkan <strong>{filteredNotes.length}</strong> dari {notes.length} catatan untuk &ldquo;{searchQuery}&rdquo;
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-blue-600 hover:underline font-medium"
          >
            Reset pencarian
          </button>
        </div>
      )}

      {/* Empty Search State */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-dashed border-slate-200 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 mx-auto flex items-center justify-center border border-slate-200">
            <SearchIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            Catatan Tidak Ditemukan
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Tidak ada catatan yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Coba gunakan kata kunci lain.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>
      ) : (
        /* Notes Grid */
        <div id="notes-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => {
            const wordCount = note.content
              ? note.content.trim().split(/\s+/).filter(Boolean).length
              : 0;

            return (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                id={`note-card-${note.id}`}
                className="group block p-5 bg-white border border-slate-200/90 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(note.createdAt)}</span>
                    </span>
                    {wordCount > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                        {wordCount} kata
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {note.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {note.content ? (
                      note.content
                    ) : (
                      <span className="italic text-slate-400 text-xs">
                        Tidak ada isi tambahan
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-blue-600 font-medium group-hover:underline">
                    Buka catatan
                  </span>
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-0.5">
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
