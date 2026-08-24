import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, X, Link, RefreshCw } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  previewHeight?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  previewHeight = "h-28",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP, GIF).");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between">
        <label className="block text-stone-300 font-bold uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
        >
          {isUrlMode ? <UploadCloud className="w-3 h-3" /> : <Link className="w-3 h-3" />}
          <span>{isUrlMode ? "Switch to File Picker" : "Paste URL Instead"}</span>
        </button>
      </div>

      {isUrlMode ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or /visa_grant.jpg"
            className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-red-500 font-mono text-xs"
          />
        </div>
      ) : (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-emerald-500 bg-emerald-950/30 text-white"
                : "border-stone-700 bg-stone-900/80 hover:border-emerald-500/60 hover:bg-stone-900 text-stone-300"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block">Click to Select Image from Device</span>
                <span className="text-[11px] text-stone-400">or Drag and Drop image file (JPG, PNG, WebP)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Image Preview Box */}
      {value && (
        <div className="mt-2 p-2 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-3">
          <div className={`w-24 ${previewHeight} rounded-lg overflow-hidden border border-stone-700 bg-black shrink-0 relative`}>
            <img
              src={value}
              alt="Selected Preview"
              className="w-full h-full object-cover"
              onError={(e) => ((e.target as HTMLElement).style.display = "none")}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Image Loaded & Ready
            </span>
            <p className="text-xs text-white font-medium truncate mt-0.5">
              {fileName || (value.startsWith("data:") ? "Direct Uploaded Image" : value)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {!isUrlMode && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Choose Another</span>
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setFileName("");
                }}
                className="px-2 py-1 bg-red-950/80 hover:bg-red-900 text-red-300 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <X className="w-2.5 h-2.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {helperText && <p className="text-[11px] text-stone-500 font-medium">{helperText}</p>}
    </div>
  );
};
