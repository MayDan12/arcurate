"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type WaitlistRow = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  help: string | null;
  created_at: string | null;
};

export default function WaitlistPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<WaitlistRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthed = rows !== null;

  const count = rows?.length ?? 0;

  const sortedRows = useMemo(() => {
    if (!rows) return [];
    return [...rows].sort((a, b) => {
      const da = a.created_at ? Date.parse(a.created_at) : 0;
      const db = b.created_at ? Date.parse(b.created_at) : 0;
      return db - da;
    });
  }, [rows]);

  async function loadWaitlist() {
    setIsLoading(true);
    const toastId = toast.loading("Loading waitlist…");
    try {
      const res = await fetch("/api/waitlist/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; data: WaitlistRow[] }
        | { ok: false; error: string }
        | null;

      if (!res.ok || !data || !data.ok) {
        toast.error(data && "error" in data ? data.error : "Unauthorized", {
          id: toastId,
        });
        return;
      }

      setRows(data.data ?? []);
      toast.success("Loaded", { id: toastId });
    } catch {
      toast.error("Network error", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-svh bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Waitlist Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
            <Button
              className="w-full h-11"
              disabled={!password.trim() || isLoading}
              onClick={loadWaitlist}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-18 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Waitlist ({count})
            </h1>
            <p className="text-sm text-muted-foreground">
              Viewing users in the waitlist.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={loadWaitlist}
              disabled={isLoading}
            >
              {isLoading ? "Refreshing…" : "Refresh"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setRows(null);
                setPassword("");
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Name</th>
                  <th className="text-left font-medium px-4 py-3">Email</th>
                  <th className="text-left font-medium px-4 py-3">Help</th>
                  <th className="text-left font-medium px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((r) => {
                  const name = [r.first_name, r.last_name]
                    .filter(Boolean)
                    .join(" ");
                  const created = r.created_at
                    ? new Date(r.created_at).toLocaleString()
                    : "";

                  return (
                    <tr key={r.email} className="border-t border-border">
                      <td className="px-4 py-3">{name || "-"}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3 capitalize">{r.help || "-"}</td>
                      <td className="px-4 py-3">{created}</td>
                    </tr>
                  );
                })}
                {sortedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No entries found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
