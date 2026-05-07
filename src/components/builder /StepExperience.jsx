import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const newEntry = () => ({
  id: Date.now().toString(),
  company: "", role: "", start_date: "", end_date: "", current: false, description: ""
});

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ExperienceEntry({ entry, onChange, onDelete, index }) {
  const [open, setOpen] = useState(true);
  const update = (k, v) => onChange({ ...entry, [k]: v });

  return (
    <Card className="border-border/60 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">
              {entry.role || "Job Title"} {entry.company ? `at ${entry.company}` : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              {entry.start_date || "Start"} – {entry.current ? "Present" : entry.end_date || "End"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/40">
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <Field label="Company / Organization *">
              <Input placeholder="Acme Corp" value={entry.company} onChange={e => update("company", e.target.value)} />
            </Field>
            <Field label="Job Title / Role *">
              <Input placeholder="Software Engineer" value={entry.role} onChange={e => update("role", e.target.value)} />
            </Field>
            <Field label="Start Date">
              <Input type="month" value={entry.start_date} onChange={e => update("start_date", e.target.value)} />
            </Field>
            <Field label="End Date">
              <Input type="month" value={entry.end_date} disabled={entry.current} onChange={e => update("end_date", e.target.value)} />
            </Field>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={entry.current} onCheckedChange={v => update("current", v)} id={`current-${entry.id}`} />
            <Label htmlFor={`current-${entry.id}`} className="text-sm cursor-pointer">I currently work here</Label>
          </div>
          <Field label="Description / Key Achievements">
            <Textarea
              placeholder="• Led a team of 5 engineers to deliver...&#10;• Increased performance by 40% by..."
              value={entry.description}
              onChange={e => update("description", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </Field>
        </div>
      )}
    </Card>
  );
}

export default function StepExperience({ data, onChange, errors }) {
  const addEntry = () => onChange([...data, newEntry()]);
  const updateEntry = (id, val) => onChange(data.map(e => e.id === id ? val : e));
  const deleteEntry = (id) => onChange(data.filter(e => e.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Work Experience</h2>
        </div>
        <p className="text-muted-foreground text-sm ml-12">Add your work history, most recent first</p>
      </div>

      {errors?.experience && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{errors.experience}</p>
      )}

      <div className="space-y-3">
        {data.map((entry, i) => (
          <ExperienceEntry
            key={entry.id}
            entry={entry}
            index={i}
            onChange={val => updateEntry(entry.id, val)}
            onDelete={() => deleteEntry(entry.id)}
          />
        ))}
      </div>

      <Button variant="outline" onClick={addEntry} className="w-full gap-2 border-dashed">
        <Plus className="h-4 w-4" />
        Add Work Experience
      </Button>
    </div>
  );
}
