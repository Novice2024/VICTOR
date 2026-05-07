import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { base44 } from "@/api/base44Client";

export default function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main>
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
