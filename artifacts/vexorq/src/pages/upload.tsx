import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle, ArrowLeft, Image as ImageIcon, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFullUrl } from "@workspace/api-client-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Strict validation for JPG only
    const fileName = selectedFile.name.toLowerCase();
    const isJpg =
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      selectedFile.type === "image/jpeg";

    if (!isJpg) {
      setErrorMessage("Strict restriction: Only .JPG / .JPEG photos and screenshots are allowed.");
      setFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a JPG photo or screenshot to upload.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("comment", comment);
      formData.append("name", name);
      formData.append("contact", contact);

      const targetUrl = getFullUrl("/api/upload");

      const response = await fetch(targetUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Upload failed. Please try again.");
      }

      setIsSuccess(true);
      setFile(null);
      setPreviewUrl(null);
      setComment("");
      setName("");
      setContact("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload document. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-md bg-background">
                <span className="font-display font-bold text-lg text-white">V</span>
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-wide">
              VEXORQ
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Header Title */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <UploadCloud className="w-3.5 h-3.5" />
              Document & Screenshot Upload
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              Upload <span className="text-gradient">Photo / Screenshot</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Please submit your document, project screenshot, or reference photo. Strictly <strong className="text-white">.JPG / .JPEG</strong> format only.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 px-6 text-center space-y-4 bg-primary/5 rounded-2xl border border-primary/20"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">Upload Successful!</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                Your image and comment have been securely saved and logged into our database and local records.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-xl"
                >
                  Upload Another Document
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-destructive/15 border border-destructive/30 flex items-start gap-3 text-destructive">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </div>
              )}

              {/* File Upload Box */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select JPG Photo / Screenshot <span className="text-primary">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    previewUrl
                      ? "border-primary/50 bg-primary/5"
                      : "border-white/15 hover:border-primary/50 bg-black/20 hover:bg-black/30"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {previewUrl ? (
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="Selected Preview"
                          className="max-h-56 mx-auto rounded-lg shadow-lg border border-white/10 object-contain"
                        />
                      </div>
                      <p className="text-xs text-primary font-medium">
                        {file?.name} ({(file ? file.size / 1024 : 0).toFixed(1)} KB)
                      </p>
                      <p className="text-xs text-muted-foreground">Click here to change photo</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        Click to browse or drag and drop your photo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supported: <strong className="text-white">.JPG, .JPEG</strong> only (Max 15MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comment Section */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary" />
                  Comment / Description
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe your screenshot, project requirements, or details here..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y text-sm"
                />
              </div>

              {/* Optional Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Durga Prasad"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Phone / Email (Optional)
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !file}
                  className="w-full py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading Document...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Document</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground">
        © 2026 VEXORQ. Bhubaneswar, Odisha.
      </footer>
    </div>
  );
}
