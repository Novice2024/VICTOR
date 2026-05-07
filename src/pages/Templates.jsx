import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const templates = [
  { name: "Modern", tag: "Popular", color: "from-primary/20 to-accent/10" },
  { name: "Classic", tag: "Professional", color: "from-chart-3/20 to-primary/10" },
  { name: "Minimal", tag: "Clean", color: "from-muted to-secondary" },
  { name: "Creative", tag: "Standout", color: "from-accent/20 to-chart-5/10" },
  { name: "Executive", tag: "Premium", color: "from-chart-3/15 to-chart-4/10" },
  { name: "Technical", tag: "Developer", color: "from-primary/15 to-chart-2/10" },
];

export default function Templates() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
          Resume Templates
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose a professional template to get started
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((tmpl) => (
          <Card key={tmpl.name} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/60 cursor-pointer">
            {/* Template preview skeleton */}
            <div className={`h-56 bg-gradient-to-br ${tmpl.color} relative p-6`}>
              <div className="space-y-2">
                <div className="h-3 w-20 bg-foreground/15 rounded" />
                <div className="h-2 w-32 bg-foreground/10 rounded" />
                <div className="mt-4 space-y-1.5">
                  <div className="h-1.5 w-full bg-foreground/8 rounded" />
                  <div className="h-1.5 w-4/5 bg-foreground/8 rounded" />
                  <div className="h-1.5 w-3/5 bg-foreground/8 rounded" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-foreground/6 rounded" />
                    <div className="h-1.5 w-4/5 bg-foreground/6 rounded" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-foreground/6 rounded" />
                    <div className="h-1.5 w-3/4 bg-foreground/6 rounded" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm" className="font-medium gap-2">
                  <Check className="h-4 w-4" />
                  Use Template
                </Button>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{tmpl.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1">{tmpl.tag}</Badge>
              </div>
              <div className="flex items-center gap-1 text-chart-4">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs font-medium">4.8</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
