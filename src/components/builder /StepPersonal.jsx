import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Camera, Loader2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function StepPersonal({ data, onChange, errors }) {
  const update = (key, val) => onChange({ ...data, [key]: val });
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      update("photo_url", file_url);
    } catch (err) {}
    setUploading(false);
  };

  const removePhoto = () => update("photo_url", null);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Personal Information</h2>
        </div>
        <p className="text-muted-foreground text-sm ml-12">Tell employers who you are</p>
      </div>

      <Card className="p-6 border-border/60 space-y-5">
        {/* Profile Photo */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {data.photo_url ? (
              <img
                src={data.photo_url}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/30">
                <User className="h-8 w-8 text-primary/40" />
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              </div>
            )}
            {data.photo_url && !uploading && (
              <button
                onClick={removePhoto}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div>
            <p className="font-medium text-sm text-foreground mb-1">Profile Photo</p>
            <p className="text-xs text-muted-foreground mb-2">JPG, PNG or GIF · Max 5MB</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              <Camera className="h-4 w-4" />
              {data.photo_url ? "Change Photo" : "Upload Photo"}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors?.full_name}>
            <Input
              placeholder="Jane Smith"
              value={data.full_name || ""}
              onChange={e => update("full_name", e.target.value)}
              className={errors?.full_name ? "border-destructive" : ""}
            />
          </Field>
          <Field label="Email Address *" error={errors?.email}>
            <Input
              type="email"
              placeholder="jane@example.com"
              value={data.email || ""}
              onChange={e => update("email", e.target.value)}
              className={errors?.email ? "border-destructive" : ""}
            />
          </Field>
          <Field label="Phone Number">
            <Input
              placeholder="+1 (555) 000-0000"
              value={data.phone || ""}
              onChange={e => update("phone", e.target.value)}
            />
          </Field>
          <Field label="Location">
            <Input
              placeholder="San Francisco, CA"
              value={data.location || ""}
              onChange={e => update("location", e.target.value)}
            />
          </Field>
          <Field label="Website / Portfolio">
            <Input
              placeholder="https://yoursite.com"
              value={data.website || ""}
              onChange={e => update("website", e.target.value)}
            />
          </Field>
          <Field label="LinkedIn Profile">
            <Input
              placeholder="linkedin.com/in/janesmith"
              value={data.linkedin || ""}
              onChange={e => update("linkedin", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Professional Summary *" error={errors?.summary}>
          <Textarea
            placeholder="A results-driven professional with 5+ years of experience in..."
            value={data.summary || ""}
            onChange={e => update("summary", e.target.value)}
            className={`min-h-[120px] resize-none ${errors?.summary ? "border-destructive" : ""}`}
          />
          <p className="text-xs text-muted-foreground">
            {(data.summary || "").length}/500 characters — aim for 2–4 sentences
          </p>
        </Field>
      </Card>
    </div>
  );
}
