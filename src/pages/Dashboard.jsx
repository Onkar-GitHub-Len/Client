import {
  PlusIcon,
  CloudUpload,
  FilePenLineIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  // Load dummy data initially
  useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  // CREATE Resume
  const createResume = (e) => {
    e.preventDefault();
    const newResume = {
      id: Date.now(),
      title,
      updatedAt: new Date().toISOString(),
    };
    setAllResumes([...allResumes, newResume]);
    setTitle("");
    setShowCreateResume(false);
    navigate("/app/builder/new123");
  };

  // UPLOAD Resume
  const uploadResume = (e) => {
    e.preventDefault();
    if (!resume) return alert("Please select a resume file!");
    const uploadedResume = {
      id: Date.now().toString(),
      title,
      updatedAt: new Date().toISOString(),
      fileName: resume.name,
    };
    setAllResumes((prev) => [...prev, uploadedResume]);
    setTitle("");
    setResume(null);
    setShowUploadResume(false);
    navigate("/app/builder/new123");
  };

  // EDIT Resume
  // EDIT Resume (open modal)
  const handleEdit = (resume) => {
    setEditResumeId(resume._id || resume.id); // ✅ Handle both
    setTitle(resume.title);
  };

  const updateResume = (e) => {
    e.preventDefault();
    const updated = allResumes.map((r) =>
      r._id === editResumeId || r.id === editResumeId
        ? { ...r, title, updatedAt: new Date().toISOString() }
        : r
    );
    setAllResumes(updated);
    setEditResumeId(null);
    setTitle("");
    navigate("/app/builder/new123");
  };

  // DELETE Resume
  // DELETE Resume
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirmed) {
      setAllResumes(
        (prev) => prev.filter((r) => r._id !== id && r.id !== id) // ✅ Handle both
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
          Welcome, <span className="text-indigo-600">Onkar Dheemate</span>
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-6 justify-start">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-48 h-52 bg-white flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-12 p-3 bg-gradient-to-br from-indigo-700 to-indigo-500 text-white rounded-full shadow-md group-hover:rotate-90 transition-transform duration-300" />
            <p className="text-base font-medium group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-48 h-52 bg-white flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <CloudUpload className="size-12 p-3 bg-gradient-to-br from-green-600 to-emerald-400 text-white rounded-full shadow-md group-hover:scale-110 transition-transform duration-300" />
            <p className="text-base font-medium group-hover:text-green-600 transition-all duration-300">
              Upload Resume
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-8 sm:w-[410px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allResumes.map((resume, idx) => {
            const baseColor = colors[idx % colors.length];
            return (
              <div
                key={resume._id}
                className="relative flex flex-col justify-between p-5 rounded-2xl backdrop-blur-md bg-white/60 border border-slate-200 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
                style={{ borderLeft: `6px solid ${baseColor}` }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full shadow-md mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}cc, ${baseColor}99)`,
                    }}
                  >
                    <FilePenLineIcon
                      onClick={() => navigate(`/app/builder/${resume._id || resume.id}`)} // ✅ Handle both
                      className="size-7 text-white"
                    />
                  </div>

                  <p
                    className="text-base font-semibold mb-1"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Updated on
                    <span className="font-medium text-slate-600">
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Action Icons */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    title="Edit"
                    onClick={() => handleEdit(resume)}
                    className="p-2 rounded-full bg-white/70 hover:bg-white shadow-sm hover:shadow-md"
                  >
                    <PencilIcon
                      className="size-4"
                      style={{ color: baseColor }}
                    />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(resume.id || resume._id)}
                    className="p-2 rounded-full bg-white/70 hover:bg-white shadow-sm hover:shadow-md"
                  >
                    <TrashIcon className="size-4 text-rose-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700"
              >
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-sm text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <CloudUpload className="size-14 stroke-1" />
                      <p className="text-sm">Drag and drop your resume here</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <form
            onSubmit={updateResume}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              <input
                type="text"
                placeholder="Enter new title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId(null);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
