import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BottomBar from "./components/BottomBar";
import Sidebar from "./components/SideBar";

/* Public */
import ChatLayout from "./components/ChatLayout";
import Home from "./page/Home";

/* Admin */
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import HospitalPage from "./admin/HospitalPage";
import BedPage from "./admin/BedPage";
import StatsDashboard from "./admin/StatsDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">

        {/* Sidebar desktop / tablette */}
        <Sidebar />

        <div className="flex-1 flex flex-col pb-16 md:pb-0">
          <Routes>

            {/* PUBLIC */}
            <Route path="/accueil" element={<Home />} />
            <Route path="/chat" element={<ChatLayout />} />

            {/* LOGIN ADMIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ADMIN PROTÉGÉ */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hospitals" element={<HospitalPage />} />
                <Route path="lits" element={<BedPage />} />
                <Route path="stats" element={<StatsDashboard />} />
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
