import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

const levelBar = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 };

function formatDate(d) {
  if (!d) return "";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1] || ""} ${y}`;
}

export default function ResumePreview({ data }) {
  const p = data.personal || {};
  const hasContact = p.email || p.phone || p.location || p.website || p.linkedin;

  return (
    <div className="bg-white text-gray-900 min-h-full p-10 font-sans text-sm leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-5 mb-5">
        <div className="flex items-start gap-4">
          {p.photo_url && (
            <img
              src={p.photo_url}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 shrink-0"
            />
          )}
          <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {p.full_name || <span className="text-gray-300">Your Name</span>}
        </h1>
        {hasContact && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
            {p.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" /> {p.email}
              </span>
            )}
            {p.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {p.phone}
              </span>
            )}
            {p.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {p.location}
              </span>
            )}
            {p.website && (
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> {p.website}
              </span>
            )}
            {p.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" /> {p.linkedin}
              </span>
            )}
          </div>
        )}
        {p.summary && (
          <p className="mt-3 text-gray-700 text-xs leading-relaxed">{p.summary}</p>
        )}
          </div>
        </div>
      </div>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-900">{exp.role || "Job Title"}</p>
                    <p className="text-gray-600 text-xs">{exp.company || "Company"}</p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                    {formatDate(exp.start_date)} – {exp.current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>
                {exp.description && (
                  <div className="mt-1.5 text-xs text-gray-700 whitespace-pre-line pl-0">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-gray-900">
                    {edu.degree || "Degree"}{edu.field ? ` in ${edu.field}` : ""}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {edu.institution || "Institution"}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                  {formatDate(edu.start_date)}{edu.end_date ? ` – ${formatDate(edu.end_date)}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Skills</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {data.skills.map(skill => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="text-xs text-gray-700 w-24 truncate">{skill.name}</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-700 rounded-full transition-all duration-500"
                    style={{ width: `${levelBar[skill.level] || 50}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!p.full_name && !data.experience?.length && !data.education?.length && !data.skills?.length && (
        <div className="text-center py-16 text-gray-300">
          <p className="text-lg">Your resume will appear here</p>
          <p className="text-sm mt-1">Start filling in your information</p>
        </div>
      )}
    </div>
  );
}
