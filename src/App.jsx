import BottomBar from "./components/BottomBar";
import Sidebar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Import de tes pages */
import ChatLayout from "./components/ChatLayout";
import AdminApp from "./admin/AdminApp";
import HospitalPage from "./admin/HospitalPage";
import BedPage from "./admin/BedPage";
import AdmissionPage from "./admin/AdmissionPage";

function Home() {
  return (
    <div className="p-6 text-center mt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">PRMI - Démo</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">

        {/* Sidebar pour tablette et PC */}
        <Sidebar />

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col pb-16 md:pb-0">
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatLayout />} />
              {/* <Route path="/pharmacies" element={<PharmacySearch />} /> */}
              <Route path="/admin/*" element={<AdminApp />}>
                <Route path="hospitals" element={<HospitalPage />} />
                <Route path="lits" element={<BedPage />} />
                <Route path="admissions" element={<AdmissionPage />} />
              </Route>
            </Routes>
          </div>
        </div>

        {/* BottomBar pour mobile */}
        <BottomBar />
      </div>
    </Router>
  );
}
