import React from "react";
import { Card } from "@/components/ui/card";
import { FilePlus, Upload, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: FilePlus,
    label: "Create Resume",
    desc: "Start from scratch",
    color: "bg-primary/10 text-primary",
    path: "/builder",
  },
  {
    icon: Sparkles,
    label: "AI Assist",
    desc: "Auto-generate content",
    color: "bg-accent/10 text-accent",
    path: null,
  },
  {
    icon: Upload,
    label: "Import",
    desc: "Upload existing resume",
    color: "bg-chart-2/10 text-chart-2",
    path: null,
  },
  {
    icon: BookOpen,
    label: "Templates",
    desc: "Browse designs",
    color: "bg-chart-3/10 text-chart-3",
    path: "/templates",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Card
          key={action.label}
          onClick={() => action.path && navigate(action.path)}
          className={`p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-border/60 group ${action.path ? "cursor-pointer" : "cursor-default opacity-60"}`}
        >
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${action.color} mb-3 transition-transform group-hover:scale-110`}>
            <action.icon className="h-5 w-5" />
          </div>
          <h4 className="font-semibold text-sm text-foreground">{action.label}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
        </Card>
      ))}
    </div>
  );
}
