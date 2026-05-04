"use client";

import { useActionState } from "react";
import { uploadCardArtwork } from "./actions";

const initial = { ok: false, message: "" };

export function CardArtworkUploadForm({ cardId }: { cardId: number }) {
  const [state, formAction, pending] = useActionState(uploadCardArtwork, initial);
  return (
    <form action={formAction} className="flex flex-col gap-3 max-w-md">
      <input type="hidden" name="cardId" value={String(cardId)} />
      <label className="font-garamond text-sm text-muted">
        Artwork file (PNG/JPEG)
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="mt-1 block w-full text-sm text-white/90"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded border border-gold/40 bg-[#1a1a22] px-4 py-2 text-sm text-gold hover:bg-gold/10 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload to API / S3"}
      </button>
      {state.message ? (
        <p
          className={
            state.ok ? "text-green-400 text-sm" : "text-red-400 text-sm wrap-break-word"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
