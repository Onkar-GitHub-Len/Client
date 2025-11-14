import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const personal = data.personalInfo || {};

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        {/* Name */}
        <h1 className="text-4xl font-semibold tracking-wide mb-2">
          {personal.full_name || "Your Name"}
        </h1>

        {/* Profession */}
        {personal.profession && (
          <h2 className="text-xl font-light text-gray-100 mb-6">
            {personal.profession}
          </h2>
        )}

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {personal.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.linkedin && (
            <a
              target="_blank"
              href={personal.linkedin}
              className="flex items-center gap-2 hover:underline"
            >
              <Linkedin className="w-4 h-4" />
              <span className="break-all text-xs">
                {personal.linkedin.replace("https://www.", "")}
              </span>
            </a>
          )}
          {personal.website && (
            <a
              target="_blank"
              href={personal.website}
              className="flex items-center gap-2 hover:underline"
            >
              <Globe className="w-4 h-4" />
              <span className="break-all text-xs">
                {personal.website.replace("https://", "")}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-6">
              {data.projects.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="text-gray-700 leading-relaxed text-sm mt-3">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
