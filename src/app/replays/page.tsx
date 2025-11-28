<a href="/replays" className="text-blue-500 underline">View Uploaded Replays</a>

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Replay = {
  id: number;
  filename: string;
  uploader_id: string;
  status: string;
  created_at: string;
};

export default function ReplayList() {
  const [replays, setReplays] = useState<Replay[]>([]);

  useEffect(() => {
    async function fetchReplays() {
      const { data, error } = await supabase
        .from("replays")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching replays:", error);
      else setReplays(data || []);
    }

    fetchReplays();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Uploaded Replays</h1>
      {replays.length === 0 ? (
        <p>No replays uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {replays.map((replay) => (
            <li key={replay.id} className="border p-4 rounded">
              <p><strong>Filename:</strong> {replay.filename}</p>
              <p><strong>Uploader:</strong> {replay.uploader_id}</p>
              <p><strong>Status:</strong> {replay.status}</p>
              <p><strong>Uploaded:</strong> {new Date(replay.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
<a href="/replays" className="text-blue-500 underline">View Uploaded Replays</a>
