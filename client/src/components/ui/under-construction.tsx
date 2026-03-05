import { Wrench } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function UnderConstruction() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-sm">
        <Wrench className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">On Vacation</h1>
        <p className="text-gray-500 mb-6">Back on March 11th</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
