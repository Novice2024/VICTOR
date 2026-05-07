import React from "react";
import { useOutletContext } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette } from "lucide-react";

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your account details",
    fields: [
      { label: "Full Name", placeholder: "John Doe", type: "text" },
      { label: "Email", placeholder: "john@example.com", type: "email" },
      { label: "Job Title", placeholder: "Software Engineer", type: "text" },
      { label: "Location", placeholder: "San Francisco, CA", type: "text" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure how you receive updates",
    toggles: [
      { label: "Email notifications", desc: "Receive resume tips and updates", default: true },
      { label: "Download alerts", desc: "Get notified when someone views your resume", default: false },
      { label: "Weekly digest", desc: "Summary of your resume performance", default: true },
    ],
  },
  {
    icon: Palette,
    title: "Preferences",
    description: "Customize your experience",
    toggles: [
      { label: "Dark mode", desc: "Use dark theme across the app", default: false },
      { label: "Compact view", desc: "Show more content in less space", default: false },
    ],
  },
];

export default function Settings() {
  const { user } = useOutletContext();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {settingsSections.map((section) => (
        <Card key={section.title} className="p-6 border-border/60">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <section.icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{section.title}</h2>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </div>

          {section.fields && (
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-2">
                  <Label className="text-sm">{field.label}</Label>
                  <Input type={field.type} placeholder={field.placeholder} />
                </div>
              ))}
            </div>
          )}

          {section.toggles && (
            <div className="space-y-4">
              {section.toggles.map((toggle, i) => (
                <div key={toggle.label}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{toggle.label}</p>
                      <p className="text-xs text-muted-foreground">{toggle.desc}</p>
                    </div>
                    <Switch defaultChecked={toggle.default} />
                  </div>
                  {i < section.toggles.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          )}

          {section.fields && (
            <div className="mt-5 flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
