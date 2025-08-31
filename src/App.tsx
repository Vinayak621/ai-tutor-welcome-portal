import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Interview from "./pages/Interview";
import Login from "./pages/Login";
import TextInterview from "./pages/TextInterview";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ImproveResume from "./pages/ImproveResume";
import InterviewDetails from "./pages/InterviewDetails";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/text-interview" element={<TextInterview />} />
          <Route path="/confidence-score" element={<ImproveResume/>} />
          <Route path="/interview-details/:_id" element={<InterviewDetails/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
