"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export function CarImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-900 mb-2">
        Upload Your Car Photo
      </p>

      {preview ? (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-100 shadow-md group">
          <Image
            src={preview}
            alt="Your car"
            fill
            sizes="100vw"
            className="object-cover object-center"
            unoptimized
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 shadow-sm transition cursor-pointer"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="aspect-[21/9] w-full border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-slate-400 hover:bg-slate-100 transition shadow-sm"
        >
          <div className="text-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-slate-400 mb-2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-xs font-semibold text-slate-500">
              Click or drag to upload your car photo
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              PNG, JPG, WEBP accepted
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
