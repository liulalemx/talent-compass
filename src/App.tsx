import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { SearchProvider } from "@/lib/searchContext";
import Index from "./pages/Index";
import HiringCases from "./pages/HiringCases";
import Candidates from "./pages/Candidates";
import CaseCreate from "./pages/CaseCreate";
import CriteriaDef from "./pages/CriteriaDef";
import CandidateEval from "./pages/CandidateEval";
import CandidateCompare from "./pages/CandidateCompare";
import Presentation from "./pages/Presentation";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

function AppLayoutWrapper() {
  return <AppLayout><Outlet /></AppLayout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SearchProvider>
          <Routes>
            <Route path="/presentation" element={<Presentation />} />
            <Route element={<AppLayoutWrapper />}>
              <Route path="/" element={<Index />} />
              <Route path="/cases" element={<HiringCases />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/cases/new" element={<CaseCreate />} />
              <Route path="/cases/:id/criteria" element={<CriteriaDef />} />
              <Route path="/cases/:id/candidates" element={<CandidateEval />} />
              <Route path="/cases/:id/compare" element={<CandidateCompare />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SearchProvider>
      </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );


export default App;
