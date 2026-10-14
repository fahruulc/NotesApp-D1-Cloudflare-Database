import Link from "next/link";

export default function NotFound() {
  return (
    <div
      id="not-found-card"
      className="max-w-md mx-auto text-center py-16 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4"
    >
      <div className="text-5xl">🔍</div>
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Catatan Tidak Ditemukan
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Catatan yang kamu cari mungkin telah dihapus atau ID yang dimasukkan salah.
        </p>
      </div>
      <div className="pt-2">
        <Link
          href="/"
          id="btn-not-found-home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
        >
          <span>&larr;</span>
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
