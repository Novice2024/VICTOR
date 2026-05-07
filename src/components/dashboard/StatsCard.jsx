import React from "react";
import { Card } from "@/components/ui/card";

export default function StatsCard({ icon: Icon, label, value, subtitle, color }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 group border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${color} transition-transform group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
