// import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";

export default function Footer() {
  const context = useData();
  const { toggleMode, mode, address } = context;
  return (
    <footer
      className="text-sm body-font"
      style={{
        backgroundColor: mode === "dark" ? "#131A22" : "#232F3E",
        color: mode === "dark" ? "#fff" : "#fff",
      }}
    >
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-bold tracking-widest text-xs mb-3 uppercase text-gray-200">
              Get to Know Us
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <a className="hover:underline cursor-pointer">About Us</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Careers</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Press Releases</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">
                  Shopfinity Devices
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-bold tracking-widest text-xs mb-3 uppercase text-gray-200">
              Connect with Us
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <a className="hover:underline cursor-pointer">Facebook</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Twitter</a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">Instagram</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-bold tracking-widest text-xs mb-3 uppercase text-gray-200">
              Make Money with Us
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <a className="hover:underline cursor-pointer">
                  Sell on Shopfinity
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer">
                  Fulfilment by Shopfinity
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-bold tracking-widest text-xs mb-3 uppercase text-gray-200">
              Let Us Help You
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <Link to="/contact" className="hover:underline">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/returnpolicy" className="hover:underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div
        className="border-t border-gray-600"
        style={{
          backgroundColor: mode === "dark" ? "#0F1111" : "#1D232A",
          color: "#ccc",
        }}
      >
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-around text-center">
          <Link
            to={"/"}
            className="flex items-center justify-center mb-2 sm:mb-0"
          >
            <span className="text-gray-400 ">{address}</span>
          </Link>
          <p className="text-sm text-gray-400">
            © 2025 <a href="https://asadalam.info/">asadalam.info</a> — All rights reserved.
          </p>
          <span className="inline-flex justify-center sm:justify-start mt-2 sm:mt-0 space-x-3">
            <a className="text-gray-400 hover:text-white cursor-pointer">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="text-gray-400 hover:text-white cursor-pointer">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
