import { Mail, Phone, MapPin, MailIcon } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-md rounded-md overflow-hidden">
      <div className="grid grid-cols-3">
        {/* Profile Image */}
        <div className="col-span-1 py-10 flex flex-col items-center border-r border-zinc-200">
          {data.personalInfo?.image &&
            (typeof data.personalInfo.image === "string" ? (
              <img
                src={data.personalInfo.image}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover shadow-md border"
                style={{ background: accentColor + "20" }}
              />
            ) : (
              typeof data.personalInfo.image === "object" && (
                <img
                  src={URL.createObjectURL(data.personalInfo.image)}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover shadow-md border"
                />
              )
            ))}
        </div>

        {/* Name + Profession */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-10">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-wide leading-snug">
            {data.personalInfo?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-500 font-medium text-sm tracking-widest mt-1">
            {data.personalInfo?.profession || "Profession"}
          </p>
        </div>

        {/* Left Sidebar */}
        <aside className="col-span-1 border-r border-zinc-200 p-8 bg-zinc-50">
          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-xs font-semibold tracking-widest text-zinc-600 mb-4">
              CONTACT
            </h2>

            <div className="space-y-3 text-sm">
              {data.personalInfo?.phone && (
                <div className="flex items-start gap-3">
                  <div className="w-4 flex justify-center">
                    <Phone size={14} style={{ color: accentColor }} />
                  </div>
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}

              {data.personalInfo?.email && (
                <div className="flex items-start gap-3">
                  <div className="w-4 flex justify-center">
                    <Mail size={14} style={{ color: accentColor }} />
                  </div>
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}

              {data.personalInfo?.location && (
                <div className="flex items-start gap-3">
                  <div className="w-4 flex justify-center">
                    <MapPin size={14} style={{ color: accentColor }} />
                  </div>
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-semibold tracking-widest text-zinc-600 mb-4">
                EDUCATION
              </h2>

              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index} className="leading-tight">
                    <p className="font-semibold uppercase text-zinc-700">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {formatDate(edu.graduation_date)}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest text-zinc-600 mb-4">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>• {skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Side Content */}
        <main className="col-span-2 p-10">
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-10">
              <h2
                className="text-xs font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-10">
              <h2
                className="text-xs font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>

              <div className="space-y-7">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-zinc-900 text-lg">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>

                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>

                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1 mt-2 pl-1">
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2
                className="text-xs font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>

              <div className="space-y-5">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      {project.name}
                    </h3>

                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1 mt-2 pl-1">
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
