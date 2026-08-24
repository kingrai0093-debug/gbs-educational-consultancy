import React, { useState, useEffect } from "react";
import { VISA_DOCUMENTS } from "../data/visaChecklist";
import { FileCheck, CheckSquare, Square, AlertCircle } from "lucide-react";

export const InteractiveVisaChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("gbs_visa_checklist");
      return saved ? JSON.parse(saved) : ["doc-3"]; // default passport checked
    } catch {
      return ["doc-3"];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    try {
      localStorage.setItem("gbs_visa_checklist", JSON.stringify(checkedIds));
    } catch {
      // ignore
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredDocs = VISA_DOCUMENTS.filter(
    (doc) => selectedCategory === "All" || doc.category === selectedCategory
  );

  return (
    <section id="checklist" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Document Verification Ledger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              Embassy & University Document Tracker
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Track your required academic, civil, and financial documents for South Korean student visa (D-2 / D-4). Bring your prepared files to our GBS office.
            </p>
          </div>
        </div>

        {/* Category Bento Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start text-xs font-bold">
          {["All", "Academic & Language", "Identity & Civil", "Financial & Sponsorship", "Embassy & University"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#25479D] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#25479D] border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Checklist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => {
            const isChecked = checkedIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                onClick={() => toggleCheck(doc.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? "bg-green-50/70 border-green-300 shadow-sm"
                    : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-gray-400 hover:text-gray-600 shrink-0"
                  aria-label={isChecked ? "Mark as uncompleted" : "Mark as completed"}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                      {doc.category}
                    </span>
                    {doc.mandatory && (
                      <span className="text-[10px] bg-red-50 text-[#ED2D2A] border border-red-100 font-extrabold px-2 py-0.5 rounded">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <h4 className={`text-base font-extrabold leading-snug ${isChecked ? "text-green-900 line-through opacity-75" : "text-gray-900"}`}>
                    {doc.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {doc.description}
                  </p>
                  <div className="pt-2 flex items-start gap-1.5 text-xs text-gray-800 font-medium bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="font-extrabold text-[#25479D] shrink-0">Nepal Rule:</span>
                    <span>{doc.nepaliRequirement}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Callout Bento Tile */}
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between flex-col sm:flex-row gap-3 text-sm text-gray-700 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#25479D] shrink-0" />
            <span className="font-semibold">Need help with MoFA attestation, Ward Relationship translation, or bank balance verification?</span>
          </div>
          <a href="tel:9744427779" className="font-extrabold text-[#ED2D2A] hover:text-red-700 shrink-0">
            Call GBS Desk: 9744427779
          </a>
        </div>

      </div>
    </section>
  );
};

