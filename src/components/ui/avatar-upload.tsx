"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, X, Upload } from "lucide-react";

interface AvatarUploadProps {
  currentImage?: string | null;
  name?: string | null;
  onImageChange: (base64: string | null) => void;
  loading?: boolean;
  label?: string;
}

function resizeImage(file: File, maxSize = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function AvatarUpload({
  currentImage,
  name,
  onImageChange,
  loading,
  label,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [dragging, setDragging] = useState(false);

  // Sync preview when prop changes (e.g. session loads)
  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image doit faire moins de 5 Mo.");
      return;
    }
    const base64 = await resizeImage(file);
    setPreview(base64);
    onImageChange(base64);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const initial = name?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex items-center gap-5">
      {/* Avatar circle */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-24 h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
            dragging
              ? "border-[#8F00FF] scale-105 shadow-lg shadow-violet-200"
              : "border-gray-200 hover:border-[#8F00FF] hover:shadow-md"
          }`}
          onClick={() => !loading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#8F00FF] to-[#6200CC] flex items-center justify-center text-white text-3xl font-black">
              {initial}
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Remove button */}
        {preview && (
          <button
            onClick={removeImage}
            disabled={loading}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md disabled:opacity-50"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-800">
          {label || "Photo de profil"}
        </p>
        <button
          type="button"
          onClick={() => !loading && inputRef.current?.click()}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-sm text-[#8F00FF] hover:underline font-medium disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {preview ? "Changer la photo" : "Télécharger une photo"}
        </button>
        <p className="text-xs text-gray-400 leading-relaxed">
          JPG, PNG ou GIF · Max 5 Mo
          <br />
          Redimensionnée automatiquement à 300×300 px
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
