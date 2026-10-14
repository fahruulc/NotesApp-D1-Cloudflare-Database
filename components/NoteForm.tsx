"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionState } from "@/app/actions";

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

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div
          role="alert"
          id="form-error-alert"
          className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-2"
        >
          <span className="text-base leading-none">⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
        >
          Judul Catatan <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          autoFocus
          defaultValue={initialData?.title ?? ""}
          placeholder="Contoh: Rencana Belajar Next.js & Cloudflare"
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
        >
          Isi Catatan{" "}
          <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
            (Boleh kosong)
          </span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={initialData?.content ?? ""}
          placeholder="Tuliskan catatanmu di sini..."
          disabled={isPending}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60 text-sm leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link
          href={cancelHref}
          id="btn-cancel"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          id="btn-submit"
          disabled={isPending}
          className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
}
