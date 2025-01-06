import Login from "./pages/components/auth/Login";
import Register from "@/pages/components/auth/Register";
import Dashboard from "@/pages/components/Dashboard";
import PostInsight from '@/pages/components/dashboard/PostInsight';
import EngagementTrends from '@/pages/components/dashboard/EngagementTrends';
import  Chat from '@/pages/components/dashboard/Chat';
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
            <Route path="dashboard/" element={<Dashboard />} >
              <Route path="post-insights" element={<PostInsight />}/>
              <Route path="engagement-trend" element={<EngagementTrends />}/>
              <Route path="chat" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
