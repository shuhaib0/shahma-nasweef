"use client";

import { useCallback, useEffect, useState } from "react";

interface Rsvp {
  id: string;
  guestName: string;
  guestCount: number;
  createdAt: string;
}

export default function Dashboard() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRsvps = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/rsvps", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load RSVP responses.");
      setRsvps(await response.json());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load RSVP responses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRsvps();
  }, [loadRsvps]);

  const removeRsvp = async (id: string) => {
    if (!window.confirm("Delete this RSVP response?")) return;
    await fetch("/api/rsvps", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadRsvps();
  };

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.guestCount, 0);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <p>Wedding Reception Dashboard</p>
        <h1>Shahma & Nasweef</h1>
        <span>27 September 2026 · Residence, Thamarassery</span>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-actions">
          <a href="/">View invitation</a>
          <button onClick={loadRsvps}>Refresh responses</button>
        </div>

        <div className="dashboard-stats">
          <article><span>RSVP Responses</span><strong>{rsvps.length}</strong></article>
          <article><span>Total Headcount</span><strong>{totalGuests}</strong></article>
          <article><span>Average Party</span><strong>{rsvps.length ? (totalGuests / rsvps.length).toFixed(1) : "0"}</strong></article>
        </div>

        <section className="responses-card">
          <div className="responses-heading">
            <div><p>Guest List</p><h2>Confirmed Responses</h2></div>
            <span>{totalGuests} guests</span>
          </div>

          {loading && <p className="dashboard-state">Loading responses...</p>}
          {error && <p className="dashboard-state error">{error}</p>}
          {!loading && !error && rsvps.length === 0 && <p className="dashboard-state">No RSVP responses yet.</p>}

          {!loading && rsvps.length > 0 && (
            <div className="responses-table-wrap">
              <table>
                <thead><tr><th>Guest name</th><th>Headcount</th><th>Submitted</th><th /></tr></thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id}>
                      <td>{rsvp.guestName}</td>
                      <td>{rsvp.guestCount}</td>
                      <td>{new Date(rsvp.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                      <td><button onClick={() => removeRsvp(rsvp.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
