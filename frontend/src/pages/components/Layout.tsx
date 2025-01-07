import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/pages/components/Navbar";
import Footer from "@/pages/components/Footer";

const Layout = () => {
  const location = useLocation();

  // List of routes where Navbar and Footer should be hidden
  const hiddenRoutes = ["/dashboard", "/dashboard/post-insights", "/dashboard/engagement-trends", "/dashboard/chat"];

  // Check if the current path matches any of the hidden routes
  const shouldHideNavbarFooter = hiddenRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      {!shouldHideNavbarFooter && <Navbar />}
      <Outlet />
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
