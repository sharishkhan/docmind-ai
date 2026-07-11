import { useRef, useState } from "react";
import { FileUp, FolderOpen } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function UploadDropzone({ disabled = false, onFileSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleFiles = (files) => {
    onFileSelect?.(files?.[0] || null);
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      handleFiles(event.dataTransfer.files);
    }
  };

  return (
    <div
      className={cn(
        "glass-panel flex min-h-[22rem] flex-col items-center justify-center rounded-3xl border-dashed p-8 text-center transition",
        isDragging && "border-primary/70 bg-primary/10",
        disabled && "pointer-events-none opacity-70",
      )}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={handleInputChange}
      />
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary shadow-glow">
        <FileUp className="h-10 w-10" aria-hidden="true" />
      </div>
      <h1 className="mt-8 text-3xl font-bold tracking-normal text-text sm:text-4xl">
        Drop your PDF here
      </h1>
      <p className="mt-3 text-muted">or</p>
      <Button className="mt-5" type="button" onClick={openFilePicker}>
        <FolderOpen className="h-4 w-4" aria-hidden="true" />
        Browse Files
      </Button>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          PDF only
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Maximum size: 50 MB
        </span>
      </div>
    </div>
  );
}
