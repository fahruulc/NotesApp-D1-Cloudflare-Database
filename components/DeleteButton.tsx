"use client";

import { useState, useTransition } from "react";
import { deleteNote } from "@/app/actions";
import { TrashIcon, AlertTriangleIcon, XIcon } from "@/components/Icons";

interface DeleteButtonProps {
  noteId: number;
}

export function DeleteButton({ noteId }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const res = await deleteNote(noteId);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        id="btn-delete-trigger"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100/80 border border-red-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-2xs"
        title="Hapus catatan"
      >
        <TrashIcon className="w-4 h-4 text-red-500" />
        <span>Hapus</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
            onKeyDown={(e) => {
              if (e.key === "Escape" && !isPending) setIsOpen(false);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3
                    id="delete-dialog-title"
                    className="text-lg font-bold text-slate-900 leading-snug"
                  >
                    Hapus Catatan Ini?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tindakan ini permanen dan tidak dapat dibatalkan.
                  </p>
                </div>
              </div>

              {!isPending && (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                  title="Tutup dialog"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              Catatan akan dihapus secara permanen dari database Cloudflare D1. Kamu tidak akan bisa memulihkan isinya kembali.
            </p>

            {error && (
              <div
                role="alert"
                className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium"
              >
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                id="btn-cancel-delete"
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 shadow-2xs"
              >
                Batal
              </button>
              <button
                type="button"
                id="btn-confirm-delete"
                disabled={isPending}
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 active:scale-95 transition shadow-xs hover:shadow disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <TrashIcon className="w-4 h-4" />
                    <span>Ya, Hapus</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
