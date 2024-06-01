import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import InputNote from "./component/InputNote";
import EditNote from "./component/EditNote";

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
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout/>} />
        <Route path="/inputnote" element={
            <div>
                <Navbar />
                <InputNote/>
            </div>
        } />
        <Route path="/editnote/:noteId" element={
            <div>
                <Navbar />
                <EditNote/>
            </div>
        } />
    </Routes>
      </BrowserRouter>
  );
}

export default App;
