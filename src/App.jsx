import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Components */
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/SideBar";

/* Public Pages */
import ChatLayout from "./components/ChatLayout";
import Home from "./page/Home";

/* Admin Pages */
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import HospitalPage from "./admin/HospitalPage";
import BedPage from "./admin/BedPage";
import StatsDashboard from "./admin/StatsDashboard";
import CreateServiceForm from "./admin/CreateServiceForm";
import AdmissionPage from "./admin/AdmissionPage";

/* Protected Route */
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">

        {/* Sidebar desktop / tablette */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col pb-16 md:pb-0">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="*" element={<Home />} />
            <Route path="/accueil" element={<Home />} />
            <Route path="/chat" element={<ChatLayout />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN ROUTES PROTECTED */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<StatsDashboard />} />
                <Route path="hospitals" element={<HospitalPage />} />
                <Route path="lits" element={<BedPage />} />
                <Route path="services" element={<CreateServiceForm />} />
                <Route path="admissions" element={<AdmissionPage />} />
                
              </Route>
            </Route>
          </Routes>
        </div>

        {/* Bottom bar mobile */}
        <BottomBar />
      </div>
    </Router>
  );
}
