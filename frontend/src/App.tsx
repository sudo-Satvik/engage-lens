import Login from "./pages/components/auth/Login";
import Register from "@/pages/components/auth/Register";
import Dashboard from "@/pages/components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/pages/components/Layout";
import LandingPage from "@/pages/components/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
