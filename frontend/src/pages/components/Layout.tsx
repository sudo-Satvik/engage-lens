import { Outlet } from "react-router-dom";
import Navbar from "@/pages/components/Navbar";
import Footer from "@/pages/components/Footer";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-800">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
