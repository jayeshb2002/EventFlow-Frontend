import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/protectedRoute";
import Login from "./pages/Login";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails";
import CreateIncident from "./pages/CreateIncident";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/incidents" element={
          <ProtectedRoute>
            <Incidents />
          </ProtectedRoute>
        } />
        <Route path="/incidents/:id" element={
          <ProtectedRoute>
            <IncidentDetails />
          </ProtectedRoute>
        } />
        <Route path="/create-incident" element={
          <ProtectedRoute>
            <CreateIncident />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
