import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { NoteIcon, PlusIcon, DatabaseIcon } from "@/components/Icons";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Catatan Saya - Notes App",
    template: "%s | Notes App",
  },
  description: "Aplikasi Catatan Pribadi Modern dengan Next.js, Prisma ORM v7, dan Cloudflare D1",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-0 z-30 transition-all">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              id="brand-logo"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition">
                <NoteIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  Notes App
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                  <DatabaseIcon className="w-3 h-3 text-blue-600" />
                  <span>Cloudflare D1</span>
                </span>
              </div>
            </Link>

            <Link
              href="/notes/new"
              id="btn-new-note-nav"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Catatan Baru</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              &copy; {new Date().getFullYear()} Notes App &bull; Dibangun dengan Next.js &amp; Prisma ORM
            </p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Cloudflare Workers Serverless D1</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
