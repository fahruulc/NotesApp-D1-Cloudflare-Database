import type { Metadata } from "next";
import { getDb } from "@/lib/prisma";
import { NotesList } from "@/components/NotesList";

export const metadata: Metadata = {
  title: "Catatan Saya",
  description: "Daftar catatan pribadi tersimpan aman di Cloudflare D1",
};

export default async function HomePage() {
  const db = await getDb();
  const notes = await db.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <NotesList notes={notes} />;
}
