import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Save, Loader2 } from "lucide-react";
import StepPersonal from "@/components/builder/StepPersonal";
import StepExperience from "@/components/builder/StepExperience";
import StepEducation from "@/components/builder/StepEducation";
import StepSkills from "@/components/builder/StepSkills";
import ResumePreview from "@/components/builder/ResumePreview";

const STEPS = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Experience" },
  { id: 3, label: "Education" },
  { id: 4, label: "Skills" },
];

const emptyResume = {
  title: "My Resume",
  personal: { full_name: "", email: "", phone: "", location: "", website: "", linkedin: "", summary: "" },
  experience: [],
  education: [],
  skills: [],
  template: "Modern",
  step: 1,
};

// LocalStorage helpers
const getResumes = () => JSON.parse(localStorage.getItem("resumes") || "[]");
const saveResumes = (list) => localStorage.setItem("resumes", JSON.stringify(list));

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");

  const [step, setStep] = useState(1);
  const [data, setData] = useState(emptyResume);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const savedIdRef = useRef(null);
  const autoSaveTimer = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing resume
  useEffect(() => {
    if (resumeId) {
      const list = getResumes();
      const found = list.find(r => r.id === resumeId);
      if (found) {
        savedIdRef.current = found.id;
        setData(found);
        setStep(found.step || 1);
      }
    }
    setLoading(false);
  }, [resumeId]);

  // Auto-save debounce
  useEffect(() => {
    if (loading) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave(false);
    }, 1500);
    return () => clearTimeout(autoSaveTimer.current);
  }, [data, loading]);

  const handleSave = useCallback(async (showIndicator = true) => {
    if (showIndicator) setSaving(true);
    try {
      const list = getResumes();
      const payload = { ...data, step };
      if (savedIdRef.current) {
        const idx = list.findIndex(r => r.id === savedIdRef.current);
        if (idx !== -1) list[idx] = { ...payload, id: savedIdRef.current };
        else list.push({ ...payload, id: savedIdRef.current });
      } else {
        const newId = Date.now().toString();
        savedIdRef.current = newId;
        list.push({ ...payload, id: newId });
      }
      saveResumes(list);
      setSavedAt(new Date());
    } catch (e) {}
    if (showIndicator) setSaving(false);
  }, [data, step]);

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      const p = data.personal;
      if (!p.full_name?.trim()) e.full_name = "Full name is required";
      if (!p.email?.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(p.email)) e.email = "Invalid email address";
      if (!p.summary?.trim()) e.summary = "Professional summary is required";
    }
    if (step === 2 && data.experience.length === 0) e.experience = "Add at least one work experience";
    if (step === 3 && data.education.length === 0) e.education = "Add at least one education entry";
    if (step === 4 && data.skills.length === 0) e.skills = "Add at least one skill";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      await handleSave(true);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
    else navigate("/");
  };

  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <button onClick={handleBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2 flex-1 justify-center max-w-md">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step === s.id ? "bg-primary text-primary-foreground shadow"
                  : step > s.id ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.id ? <Check className="h-3 w-3" /> : <span>{s.id}</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-4 ${step > s.id ? "bg-primary/40" : "bg-border"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {savedAt && !saving && (
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {saving && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setShowPreview(p => !p)}>
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${showPreview ? "grid lg:grid-cols-2 gap-8" : ""}`}>
        <div className="space-y-6">
          {step === 1 && <StepPersonal data={data.personal} onChange={(val) => updateData("personal", val)} errors={errors} />}
          {step === 2 && <StepExperience data={data.experience} onChange={(val) => updateData("experience", val)} errors={errors} />}
          {step === 3 && <StepEducation data={data.education} onChange={(val) => updateData("education", val)} errors={errors} />}
          {step === 4 && <StepSkills data={data.skills} onChange={(val) => updateData("skills", val)} errors={errors} />}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button onClick={handleNext} className="gap-2 shadow-lg shadow-primary/20">
              {step === 4 ? (<><Save className="h-4 w-4" />Finish & Save</>) : (<>Next<ArrowRight className="h-4 w-4" /></>)}
            </Button>
          </div>
        </div>
        {showPreview && (
          <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-auto rounded-xl border border-border shadow-xl">
            <ResumePreview data={data} />
          </div>
        )}
      </div>

      {!showPreview && (
        <div className="fixed bottom-6 right-6 lg:hidden">
          <Button size="sm" className="shadow-xl shadow-primary/20 rounded-full px-4" onClick={() => setShowPreview(true)}>
            Preview
          </Button>
        </div>
      )}
    </div>
  );
}
