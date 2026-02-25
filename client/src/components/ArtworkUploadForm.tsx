import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Upload, User, Mail, Phone, Check, Loader2, ArrowRight,
} from "lucide-react";

interface ArtworkUploadFormProps {
  serviceName?: string;
}

export default function ArtworkUploadForm({ serviceName }: ArtworkUploadFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = name.trim() && email.trim() && tel.trim();

  async function handleSubmit() {
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", tel.trim());
      if (serviceName) formData.append("service", serviceName);
      if (artworkFile) {
        formData.append("artwork", artworkFile);
      }
      const res = await fetch("/api/artwork-submit", { method: "POST", body: formData });
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
        Enter your details and upload your print-ready file
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

      <label
        className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg transition-all mb-3 ${
          isFormValid
            ? "border-gray-300 cursor-pointer hover:border-primary/50 hover:bg-primary/5"
            : "border-gray-200 cursor-not-allowed bg-gray-50"
        }`}
        data-testid="upload-artwork"
      >
        {artworkFile ? (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <Check className="w-4 h-4" />
            {artworkFile.name}
          </div>
        ) : (
          <>
            <Upload className={`w-5 h-5 mb-1 ${isFormValid ? "text-gray-400" : "text-gray-300"}`} />
            <span className={`text-xs ${isFormValid ? "text-gray-500" : "text-gray-400"}`}>
              {isFormValid ? "Click to attach file (optional)" : "Fill in details above first"}
            </span>
          </>
        )}
        <input
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.ai,.eps,.tiff,.tif"
          disabled={!isFormValid}
          onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
          data-testid="input-artwork-file"
        />
      </label>

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
