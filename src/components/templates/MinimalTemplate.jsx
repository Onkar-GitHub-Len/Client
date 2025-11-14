const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white text-gray-900 font-light leading-relaxed">
      {/* Header */}
      <header className="mb-10 border-b border-gray-300 pb-5">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2 tracking-wide">
          {data.personalInfo?.full_name || "Your Name"}
        </h1>
        <p className="uppercase text-sm text-gray-500 mb-4">
          {data.personalInfo?.profession || "Your Profession"}
        </p>

        <div className="flex flex-wrap gap-5 text-sm text-gray-600">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo?.linkedin && (
            <span className="break-all">{data.personalInfo.linkedin}</span>
          )}
          {data.personalInfo?.website && (
            <span className="break-all">{data.personalInfo.website}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-4 font-medium"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-5 font-medium"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium text-gray-800">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 whitespace-pre-line text-sm">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-5 font-medium"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-5">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-800">
                  {proj.name}
                </h3>
                {proj.type && (
                  <p className="text-sm text-gray-600 mb-1">{proj.type}</p>
                )}
                {proj.description && (
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-5 font-medium"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase tracking-widest mb-5 font-medium"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="text-gray-800 text-sm">{data.skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
