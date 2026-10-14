"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangleIcon } from "@/components/Icons";

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
      className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-red-200 rounded-3xl shadow-xs space-y-5 my-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-100">
        <AlertTriangleIcon className="w-8 h-8 text-red-600" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl font-bold text-slate-900">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Tidak dapat memuat atau memproses data saat ini. Silakan coba kembali.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-2xs"
        >
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}
