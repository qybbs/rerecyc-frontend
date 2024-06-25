import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import InputMitra from "./component/InputMitra";
import EditMitra from "./component/EditMitra";
import DashboardStatus from "./component/status/DashboardStatus";
import DashboardPerolehan from "./component/perolehan/DashboardPerolehan";
import DashboardAnggaran from "./component/anggaran/DashboardAnggaran";
import InputStatus from "./component/status/InputStatus";
import InputPerolehan from "./component/perolehan/InputPerolehan";
import EditPerolehan from "./component/perolehan/EditPerolehan";
import InputAnggaran from "./component/anggaran/InputAnggaran";
import EditAnggaran from "./component/anggaran/EditAnggaran";

const DashboardLayout = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
        </div>
    );
};

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<DashboardLayout/>} />
        <Route path="/inputmitra" element={
            <div>
                <Navbar />
                <InputMitra/>
            </div>
        } />
        <Route path="/editmitra/:idMitra" element={
            <div>
                <Navbar />
                <EditMitra />
            </div>
        } />
        <Route path="/status" element={
            <div>
                <Navbar />
                <DashboardStatus />
            </div>
        } />
        <Route path="/inputstatus" element={
            <div>
                <Navbar />
                <InputStatus />
            </div>
        } />
        <Route path="/perolehan" element={
            <div>
                <Navbar />
                <DashboardPerolehan />
            </div>
        } />
        <Route path="/inputperolehan" element={
            <div>
                <Navbar />
                <InputPerolehan />
            </div>
        } />
        <Route path="/editperolehan/:idPerolehan" element={
            <div>
                <Navbar />
                <EditPerolehan />
            </div>
        } />
        <Route path="/anggaran" element={
            <div>
                <Navbar />
                <DashboardAnggaran />
            </div>
        } />
        <Route path="/inputanggaran" element={
            <div>
                <Navbar />
                <InputAnggaran />
            </div>
        } />
        <Route path="/editanggaran/:idAnggaran" element={
            <div>
                <Navbar />
                <EditAnggaran />
            </div>
        } />
    </Routes>
      </BrowserRouter>
  );
}

export default App;
