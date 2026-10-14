"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/prisma";

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function createNote(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawTitle = formData.get("title");
  const rawContent = formData.get("content");

  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const content = typeof rawContent === "string" ? rawContent.trim() : "";

  if (!title) {
    return { error: "Judul catatan wajib diisi." };
  }

  let createdId: number;
  try {
    const db = await getDb();
    const note = await db.note.create({
      data: {
        title,
        content,
      },
    });
    createdId = note.id;
  } catch (err) {
    console.error("Gagal membuat catatan:", err);
    return { error: "Terjadi kesalahan saat menyimpan catatan ke database." };
  }

  revalidatePath("/");
  redirect(`/notes/${createdId}`);
}

export async function updateNote(
  id: number,
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  if (!id || isNaN(id)) {
    return { error: "ID catatan tidak valid." };
  }

  const rawTitle = formData.get("title");
  const rawContent = formData.get("content");

  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const content = typeof rawContent === "string" ? rawContent.trim() : "";

  if (!title) {
    return { error: "Judul catatan wajib diisi." };
  }

  try {
    const db = await getDb();
    const existing = await db.note.findUnique({ where: { id } });
    if (!existing) {
      return { error: "Catatan tidak ditemukan." };
    }

    await db.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  } catch (err) {
    console.error("Gagal memperbarui catatan:", err);
    return { error: "Terjadi kesalahan saat memperbarui catatan." };
  }

  revalidatePath("/");
  revalidatePath(`/notes/${id}`);
  redirect(`/notes/${id}`);
}

export async function deleteNote(id: number): Promise<{ error?: string }> {
  if (!id || isNaN(id)) {
    return { error: "ID catatan tidak valid." };
  }

  let success = false;
  try {
    const db = await getDb();
    await db.note.delete({
      where: { id },
    });
    revalidatePath("/");
    success = true;
  } catch (err) {
    console.error("Gagal menghapus catatan:", err);
    return { error: "Terjadi kesalahan saat menghapus catatan." };
  }

  if (success) {
    redirect("/");
  }

  return {};
}
