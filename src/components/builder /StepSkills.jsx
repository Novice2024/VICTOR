import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, X } from "lucide-react";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const levelColor = {
  Beginner: "bg-muted text-muted-foreground",
  Intermediate: "bg-chart-4/15 text-chart-4",
  Advanced: "bg-primary/15 text-primary",
  Expert: "bg-accent/15 text-accent",
};

const SUGGESTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL",
  "Git", "Docker", "AWS", "Figma", "Communication", "Leadership",
  "Project Management", "Data Analysis", "Machine Learning"
];

export default function StepSkills({ data, onChange, errors }) {
  const [input, setInput] = useState("");
  const [level, setLevel] = useState("Intermediate");

  const addSkill = (name) => {
    const n = (name || input).trim();
    if (!n) return;
    if (data.find(s => s.name.toLowerCase() === n.toLowerCase())) return;
    onChange([...data, { id: Date.now().toString(), name: n, level }]);
    setInput("");
  };

  const removeSkill = (id) => onChange(data.filter(s => s.id !== id));
  const updateLevel = (id, newLevel) => onChange(data.map(s => s.id === id ? { ...s, level: newLevel } : s));

  const suggestions = SUGGESTIONS.filter(s => !data.find(d => d.name.toLowerCase() === s.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-9 w-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Wrench className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Skills</h2>
        </div>
        <p className="text-muted-foreground text-sm ml-12">Add your technical and soft skills</p>
      </div>

      {errors?.skills && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{errors.skills}</p>
      )}

      {/* Add skill input */}
      <Card className="p-5 border-border/60 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a skill name..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="flex-1"
          />
          <Button onClick={() => addSkill()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Level selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Level:</span>
          {LEVELS.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                level === l
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2">Quick add suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 8).map(s => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                className="px-3 py-1 rounded-full text-xs border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Added skills */}
      {data.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-3">Your skills ({data.length}):</p>
          <div className="flex flex-wrap gap-2">
            {data.map(skill => (
              <div
                key={skill.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${levelColor[skill.level]} border border-current/20`}
              >
                <span>{skill.name}</span>
                <span className="opacity-60">· {skill.level}</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="ml-1 hover:opacity-70 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
