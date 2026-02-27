import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_BASE } from "@/lib/queryClient";
import {
  Upload, User, Mail, Phone, Check, Loader2, ArrowRight, X, FileText,
} from "lucide-react";

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_FILES = 5;
const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.ai,.eps,.tiff,.tif";

interface ArtworkUploadFormProps {
  serviceName?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ArtworkUploadForm({ serviceName }: ArtworkUploadFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [artworkFiles, setArtworkFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = name.trim() && email.trim() && tel.trim();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    const oversized = selected.filter((f) => f.size > MAX_FILE_SIZE_BYTES);
    if (oversized.length > 0) {
      toast({
        title: "File too large",
        description: `${oversized.map((f) => f.name).join(", ")} exceeds the ${MAX_FILE_SIZE_MB}MB limit.`,
        variant: "destructive",
      });
    }
    const valid = selected.filter((f) => f.size <= MAX_FILE_SIZE_BYTES);
    const combined = [...artworkFiles, ...valid].slice(0, MAX_FILES);
    setArtworkFiles(combined);
    e.target.value = "";
  }

  function removeFile(index: number) {
    setArtworkFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", tel.trim());
      if (serviceName) formData.append("service", serviceName);
      artworkFiles.forEach((file) => formData.append("artwork", file));
      const res = await fetch(`${API_BASE}/api/artwork-submit`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast({ title: "Artwork details submitted", description: "We'll be in touch shortly about your order." });
    } catch {
      toast({ title: "Submission failed", description: "Please try again or email info@copyprint.ie", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-green-200 p-5 text-center">
        <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-gray-900">Details submitted!</p>
        <p className="text-xs text-gray-500 mt-1">We'll contact you shortly about your artwork.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Upload className="w-4 h-4 text-primary" />
        Upload Artwork
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        Enter your details and upload your print-ready files
      </p>

      <div className="space-y-2 mb-3">
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-name"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-email"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="tel"
            placeholder="Phone number *"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            data-testid="input-artwork-tel"
          />
        </div>
      </div>

      {artworkFiles.length > 0 && (
        <div className="space-y-1 mb-3">
          {artworkFiles.map((file, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-lg">
              <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-xs text-gray-700 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-500 shrink-0">{formatFileSize(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${file.name}`}
                data-testid={`button-remove-file-${i}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {artworkFiles.length < MAX_FILES && (
        <label
          className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg transition-all mb-3 ${
            isFormValid
              ? "border-gray-300 cursor-pointer hover:border-primary/50 hover:bg-primary/5"
              : "border-gray-200 cursor-not-allowed bg-gray-50"
          }`}
          data-testid="upload-artwork"
        >
          <Upload className={`w-5 h-5 mb-1 ${isFormValid ? "text-gray-400" : "text-gray-300"}`} />
          <span className={`text-xs ${isFormValid ? "text-gray-500" : "text-gray-400"}`}>
            {isFormValid
              ? `Click to attach files (up to ${MAX_FILES}, ${MAX_FILE_SIZE_MB}MB each)`
              : "Fill in details above first"}
          </span>
          <input
            type="file"
            className="hidden"
            accept={ACCEPTED_TYPES}
            multiple
            disabled={!isFormValid}
            onChange={handleFileChange}
            data-testid="input-artwork-file"
          />
        </label>
      )}

      <Button
        className="w-full gap-2"
        onClick={handleSubmit}
        disabled={!isFormValid || submitting}
        data-testid="button-submit-artwork"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          <><ArrowRight className="w-4 h-4" /> Submit Details</>
        )}
      </Button>

      <p className="text-[11px] text-gray-400 mt-2 text-center">
        Or email artwork to <a href="mailto:info@copyprint.ie" className="text-primary hover:underline">info@copyprint.ie</a>
      </p>
    </div>
  );
}
