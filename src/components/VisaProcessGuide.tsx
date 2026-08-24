import React, { useState } from "react";
import { VISA_STEPS } from "../data/visaChecklist";
import { Award, Clock, MapPin, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

interface VisaProcessGuideProps {
  onOpenBooking: () => void;
}

export const VisaProcessGuide: React.FC<VisaProcessGuideProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStepData = VISA_STEPS.find((s) => s.stepNumber === activeStep) || VISA_STEPS[0];

  return (
    <section id="visa-guide" className="py-16 sm:py-24 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Embassy Tahachal Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#25479D] tracking-tight">
              6-Stage Korea Student Visa (D-2 / D-4) Pathway
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              From initial evaluation at GBS Educational Consultancy to your flight boarding for Incheon International Airport.
            </p>
          </div>
        </div>

        {/* Step Navigation Bento Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {VISA_STEPS.map((step) => {
            const isActive = step.stepNumber === activeStep;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStep(step.stepNumber)}
                className={`p-3.5 rounded-lg border text-left transition-all relative cursor-pointer ${
                  isActive
                    ? "bg-[#25479D] text-white border-[#25479D] shadow-md ring-2 ring-[#25479D]/30"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#25479D]/50 hover:bg-blue-50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black ${
                      isActive ? "bg-white text-[#25479D]" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                  <span className={`text-[10px] font-bold ${isActive ? "text-blue-200" : "text-gray-400"}`}>
                    {step.duration}
                  </span>
                </div>
                <div className="text-xs font-extrabold line-clamp-1 leading-tight">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Bento Showcase */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-red-50 text-[#ED2D2A] border border-red-100">
                  STAGE 0{currentStepData.stepNumber} OF 06
                </span>
                <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Duration: {currentStepData.duration}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Key Action Points */}
            <div className="space-y-2.5 bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider mb-2">
                Stage Deliverables & Actions:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {currentStepData.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nepali Local Context Box */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-gray-900">
              <MapPin className="w-5 h-5 text-[#25479D] shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-[#25479D]">Kathmandu & GBS Support:</strong>
                <p className="text-gray-700 mt-0.5 font-medium">{currentStepData.nepaliContext}</p>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                ← Previous Stage
              </button>

              {activeStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                  className="px-5 py-2.5 rounded text-xs font-bold bg-[#25479D] hover:bg-blue-900 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Next: Stage 0{activeStep + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded text-xs font-bold bg-[#ED2D2A] hover:bg-red-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Start Your Process Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Trust Sidebar Bento Card */}
          <div className="lg:col-span-4 bg-[#25479D] text-white p-6 sm:p-7 rounded-xl space-y-4 border border-blue-900 shadow-md">
            <div className="w-10 h-10 rounded bg-blue-900 border border-blue-800 flex items-center justify-center text-xl">
              🇰🇷
            </div>
            <h4 className="text-base font-black text-white">Why GBS for South Korea?</h4>
            <p className="text-xs text-blue-100 leading-relaxed font-medium">
              We specialize solely in South Korea counseling with direct university agreements, ensuring proper MoFA attestation, genuine bank solvency files, and mock interviews for Embassy Tahachal.
            </p>

            <div className="pt-3 border-t border-blue-800 space-y-3 text-sm text-blue-50">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-semibold">Zero counseling charge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-semibold">Genuine Embassy file guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-semibold">Complimentary TOPIK Hangul support</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-4 py-3.5 rounded text-sm font-bold bg-[#ED2D2A] hover:bg-red-700 text-white transition-colors shadow-md text-center cursor-pointer"
            >
              Book Free Counseling in Bagbazar
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

