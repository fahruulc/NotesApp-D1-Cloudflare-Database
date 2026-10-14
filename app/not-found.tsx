import Link from "next/link";
import { SearchIcon, ArrowLeftIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div
      id="not-found-card"
      className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-slate-200 rounded-3xl shadow-xs space-y-5 my-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-100">
        <SearchIcon className="w-8 h-8 text-blue-600" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl font-bold text-slate-900">
          Catatan Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Catatan yang kamu cari mungkin telah dihapus atau tautan yang dimasukkan tidak tepat.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          id="btn-not-found-home"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
