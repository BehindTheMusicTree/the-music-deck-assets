import Link from "next/link";
import { CardArtworkUploadForm } from "./upload-form";

export default async function AdminCardArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isFinite(id)) {
    return <p className="p-6 text-red-400">Invalid id</p>;
  }
  return (
    <div className="px-6 py-10 max-w-lg mx-auto">
      <p className="text-muted text-sm mb-4">
        <Link href="/catalog" className="text-gold underline-offset-2 hover:underline">
          ← Catalog
        </Link>
      </p>
      <h1 className="font-cinzel text-xl text-white mb-2">Card #{id}</h1>
      <p className="font-garamond text-muted text-sm mb-6">
        Multipart upload is proxied to the Nest API with{" "}
        <code className="text-gold/90">ADMIN_API_TOKEN</code> (server env only).
      </p>
      <CardArtworkUploadForm cardId={id} />
    </div>
  );
}
