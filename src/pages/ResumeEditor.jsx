import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  User, Briefcase, GraduationCap, Wrench, FolderOpen,
  Award, Globe, Heart, ArrowLeft, Eye, Download
} from "lucide-react";
import SectionCard from "@/components/editor/SectionCard";
import { Link } from "react-router-dom";

const sections = [
  { icon: User, title: "Personal Information", description: "Name, contact details, and professional summary", status: "complete" },
  { icon: Briefcase, title: "Work Experience", description: "Employment history and achievements", itemCount: 3, status: "partial" },
  { icon: GraduationCap, title: "Education", description: "Degrees, certifications, and courses", itemCount: 2, status: "complete" },
  { icon: Wrench, title: "Skills", description: "Technical and soft skills", itemCount: 8, status: "partial" },
  { icon: FolderOpen, title: "Projects", description: "Personal and professional projects", itemCount: 0, status: "empty" },
  { icon: Award, title: "Certifications", description: "Professional certifications and licenses", itemCount: 1, status: "partial" },
  { icon: Globe, title: "Languages", description: "Language proficiencies", itemCount: 0, status: "empty" },
  { icon: Heart, title: "Interests", description: "Hobbies and personal interests", itemCount: 0, status: "empty" },
];

export default function ResumeEditor() {
  const completeSections = sections.filter(s => s.status === "complete").length;
  const progress = Math.round((completeSections / sections.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
              Software Engineer Resume
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Last edited 2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="gap-2 shadow-lg shadow-primary/20">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-5 border-border/60">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">Resume Completion</h3>
            <p className="text-sm text-muted-foreground">
              {completeSections} of {sections.length} sections complete
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      {/* Sections */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Resume Sections</h2>
        <div className="space-y-3">
          {sections.map((section) => (
            <SectionCard key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
