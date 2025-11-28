"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const onSubmit = async () => {
    if (!file) return;
    setStatus("Uploading...");
    const form = new FormData();
    form.append("replay", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const json = await res.json();
    setStatus(json.message || "Uploaded");
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Upload a .replay file</h2>
      <input type="file" accept=".replay" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={onSubmit} style={{ marginTop: "1rem" }}>Submit</button>
      <p>{status}</p>
    </main>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Rocket Replay Hub</h1>
      <p className="mb-6">Upload and share your Rocket League replays.</p>

      {/* Link to Replay List */}
      <Link href="/replays" className="text-blue-500 underline">
        View Uploaded Replays
      </Link>
    </main>
  );
}
