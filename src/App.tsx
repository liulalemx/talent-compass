import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import HiringCases from "./pages/HiringCases";
import Candidates from "./pages/Candidates";
import CaseCreate from "./pages/CaseCreate";
import CriteriaDef from "./pages/CriteriaDef";
import CandidateEval from "./pages/CandidateEval";
import CandidateCompare from "./pages/CandidateCompare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<HiringCases />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/cases/new" element={<CaseCreate />} />
            <Route path="/cases/:id/criteria" element={<CriteriaDef />} />
            <Route path="/cases/:id/candidates" element={<CandidateEval />} />
            <Route path="/cases/:id/compare" element={<CandidateCompare />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
