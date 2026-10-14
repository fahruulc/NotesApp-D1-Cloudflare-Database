"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Terjadi error pada aplikasi:", error);
  }, [error]);

  return (
    <div
      role="alert"
      id="error-state-card"
      className="max-w-md mx-auto text-center py-16 px-4 bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-900/40 rounded-2xl shadow-xs space-y-4"
    >
      <div className="text-5xl">⚠️</div>
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Tidak dapat memuat atau memproses data saat ini.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition shadow-sm"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}
