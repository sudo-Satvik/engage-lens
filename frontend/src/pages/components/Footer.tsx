import { Link } from "react-router-dom";
import logo from "@/assets/logo-dark.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div>
            <img src={logo} alt="EngageLens Logo" className="h-[80px] mb-4" />
            <p className="text-sm text-gray-400">
            EngageLens helps you analyze and optimize your social media engagement with AI-powered insights.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition"
                >
                  How it Works?
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-bold">Email:</span> sharmadeveloper081@gmail.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> +91 12345-67890
              </li>
              <li>
                <span className="font-bold">Address:</span> 123 AI Street,
                Techville, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EngageLens. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
