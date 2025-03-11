
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Patients from "./pages/Patients";
import PatientCreate from "./pages/PatientCreate";
import PatientDetails from "./pages/PatientDetails";
import Appointments from "./pages/Appointments";
import AppointmentCreate from "./pages/AppointmentCreate";
import Records from "./pages/Records";
import Billing from "./pages/Billing";
import Exercises from "./pages/Exercises";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<PatientCreate />} />
          <Route path="/patients/:patientId" element={<PatientDetails />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/new" element={<AppointmentCreate />} />
          <Route path="/records" element={<Records />} />
          <Route path="/records/new" element={<Records />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/new" element={<Billing />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/new" element={<Exercises />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
