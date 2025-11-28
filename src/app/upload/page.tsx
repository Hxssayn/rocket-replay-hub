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
