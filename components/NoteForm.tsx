"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ActionState } from "@/app/actions";
import { AlertCircleIcon, CheckIcon, ArrowLeftIcon } from "@/components/Icons";

interface NoteFormProps {
  action: (prevState: ActionState | null, formData: FormData) => Promise<ActionState>;
  initialData?: {
    title: string;
    content: string;
  };
  submitLabel: string;
  cancelHref: string;
}

export function NoteForm({
  action,
  initialData,
  submitLabel,
  cancelHref,
}: NoteFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");

  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div
          role="alert"
          id="form-error-alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 shadow-2xs"
        >
          <AlertCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Gagal Menyimpan Catatan</span>
            <span className="text-xs text-red-600 leading-relaxed">{state.error}</span>
          </div>
        </div>
      )}

      {/* Field Judul */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-800"
          >
            Judul Catatan <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {title.length} karakter
          </span>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul catatan yang jelas..."
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition text-sm sm:text-base disabled:opacity-60 shadow-2xs"
        />
      </div>

      {/* Field Isi Catatan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-slate-800"
          >
            Isi Catatan{" "}
            <span className="text-xs font-normal text-slate-400">
              (Opsional)
            </span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {wordCount} kata &bull; {content.length} karakter
          </span>
        </div>
        <textarea
          id="content"
          name="content"
          rows={9}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tuliskan isi catatan, ide, atau to-do list di sini..."
          disabled={isPending}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition disabled:opacity-60 text-sm leading-relaxed shadow-2xs font-sans"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <Link
          href={cancelHref}
          id="btn-cancel"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-2xs"
        >
          <ArrowLeftIcon className="w-4 h-4 text-slate-400" />
          <span>Batal</span>
        </Link>
        <button
          type="submit"
          id="btn-submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
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
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>{submitLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
