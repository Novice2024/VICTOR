import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Plus } from "lucide-react";

export default function SectionCard({ icon: Icon, title, description, itemCount, status }) {
  const statusColor = status === "complete"
    ? "bg-primary/10 text-primary"
    : status === "partial"
    ? "bg-chart-4/10 text-chart-4"
    : "bg-muted text-muted-foreground";

  const statusLabel = status === "complete"
    ? "Complete"
    : status === "partial"
    ? "In Progress"
    : "Not Started";

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/60">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <Badge variant="secondary" className={`text-xs ${statusColor}`}>
              {statusLabel}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {itemCount !== undefined && (
            <span className="text-xs text-muted-foreground">{itemCount} items</span>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Card>
  );
}
