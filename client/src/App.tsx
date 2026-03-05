import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import UnderConstruction from "@/components/ui/under-construction";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UnderConstruction />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
