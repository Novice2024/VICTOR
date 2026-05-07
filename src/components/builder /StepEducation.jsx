import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const newEntry = () => ({
  id: Date.now().toString(),
  institution: "", degree: "", field: "", start_date: "", end_date: "", gpa: ""
});

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function EducationEntry({ entry, onChange, onDelete, index }) {
  const [open, setOpen] = useState(true);
  const update = (k, v) => onChange({ ...entry, [k]: v });

  return (
    <Card className="border-border/60 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-chart-3/10 text-chart-3 flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">
              {entry.degree || "Degree"} {entry.field ? `in ${entry.field}` : ""}
            </p>
            <p className="text-xs text-muted-foreground">{entry.institution || "Institution"}</p>
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
            <Field label="Institution Name *">
              <Input placeholder="MIT" value={entry.institution} onChange={e => update("institution", e.target.value)} />
            </Field>
            <Field label="Degree / Qualification">
              <Input placeholder="Bachelor of Science" value={entry.degree} onChange={e => update("degree", e.target.value)} />
            </Field>
            <Field label="Field of Study">
              <Input placeholder="Computer Science" value={entry.field} onChange={e => update("field", e.target.value)} />
            </Field>
            <Field label="GPA (optional)">
              <Input placeholder="3.8 / 4.0" value={entry.gpa} onChange={e => update("gpa", e.target.value)} />
            </Field>
            <Field label="Start Date">
              <Input type="month" value={entry.start_date} onChange={e => update("start_date", e.target.value)} />
            </Field>
            <Field label="End Date">
              <Input type="month" value={entry.end_date} onChange={e => update("end_date", e.target.value)} />
            </Field>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function StepEducation({ data, onChange, errors }) {
  const addEntry = () => onChange([...data, newEntry()]);
  const updateEntry = (id, val) => onChange(data.map(e => e.id === id ? val : e));
  const deleteEntry = (id) => onChange(data.filter(e => e.id !== id));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-9 w-9 rounded-xl bg-chart-3/10 text-chart-3 flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Education</h2>
        </div>
        <p className="text-muted-foreground text-sm ml-12">Add your academic background</p>
      </div>

      {errors?.education && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg">{errors.education}</p>
      )}

      <div className="space-y-3">
        {data.map((entry, i) => (
          <EducationEntry
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
        Add Education
      </Button>
    </div>
  );
}
