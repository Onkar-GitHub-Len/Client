import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setisOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek, contemporary design with bold headings and a focus on readability",
    },
    {
      id: "minimalimage",
      name: "Minimal Image",
      preview:
        "A clean, minimalistic design that includes a profile image for a personal touch",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A simple, elegant layout that emphasizes content over design elements",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setisOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <Layout size={16} className="opacity-90" />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm max-h-64 overflow-y-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setisOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
