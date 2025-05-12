import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const context = useData();
  const {
    mode,
    toggleMode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;

  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // For dark and light mode--------------------
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // FOR LOGOUT-----------------
  function handleLogout() {
    auth.signOut();
    setIsDropdownOpen((prev) => !prev);
    localStorage.clear("user");
    navigate("/");
    toast.success("Logout Successfully!");
  }

  // For loggedIn user information--------------
  const user = JSON.parse(localStorage.getItem("user"));

  // cartItems data---------------------
  const cartItems = useSelector((state) => state.cart);

  //for select section--------------------------------

  return (
    <div className="bg-white sticky top-0 z-50 ">
      {/* Mobile menu */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Home
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/allproducts"}
                      className="-m-2 block p-2 font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      All Products
                    </Link>
                  </div>
                  {user ? (
                    <div className="flow-root">
                      <Link
                        to={"/order"}
                        style={{ color: mode === "dark" ? "white" : "" }}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Order
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  {user?.user?.email === "asadalam4291@gmail.com" ? (
                    <div className="flow-root">
                      <Link
                        to={"/dashboard"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Admin
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  {user ? (
                    <div className="flow-root">
                      <Link
                        to={"/"}
                        onClick={handleLogout}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={"/login"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Login
                    </Link>
                  )}

                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov"
                      />{" "}
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-base font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* desktop  */}
      <header className="bg-[#131921] text-white w-full shadow-md">
        {/* Main Navbar */}
        <div className="flex items-center justify-between px-4 lg:px-8 py-2">
          {/* Left: Logo and Location */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link to="/" className="text-yellow-400 font-bold text-2xl">
              Amazon
            </Link>
            <div className="hidden md:flex flex-col leading-tight text-sm">
              <span className="text-gray-300">
                Delivering to Lucknow 226003
              </span>
              <button className="text-white hover:underline text-xs">
                Update location
              </button>
            </div>
          </div>

          {/* Middle: Search */}
          <div className=" hidden md:flex flex-grow mx-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-200 text-black text-sm p-2 w-24 rounded-l-md outline-0 "
            >
              <option value="">
                Select
              </option>
              <option value="">All</option>
              {/* {product.map((item, idx) => {
                return <option key={idx} value={item.category.replace(/\s+/g, '').toLowerCase()}>{item.category}</option>;
              })} */}
              {/* Ye distinct option ko hi select option me show krayega */}
              {[...new Set(product.map((item) => item.category))].map(
                (item, idx) => (
                  <option
                    key={idx}
                    value={item.replace(/\s+/g, "").toLowerCase()}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <input
              type="text"
              name="searchkey"
              id="searchkey"
              placeholder="Search here"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              className="px-8 py-3 w-full bg-amber-50 text-black border-transparent outline-0 text-sm"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            />
            <button className="bg-yellow-400 px-4 rounded-r-md">🔍</button>
          </div>

          {/* Right: Links and Icons */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center space-x-1">
              <img
                src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                alt="IN"
                className="w-5 h-4"
              />
              <span>EN</span>
            </div>

            {/* Account/Orders */}
            {user ? (
              <div className="hidden md:flex flex-col text-white">
                <Link to={"/orders"}>
                  <span className="text-xs">Returns</span> <br />
                  <span className="font-bold text-sm">& Orders</span>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex flex-col text-white">
                <Link to={"/login"}>
                  <span className="text-xs">Hello, sign in</span> <br />
                  <span className="font-bold text-sm">Account & Lists</span>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleMode} className="text-xl">
              {mode === "dark" ? <BsFillCloudSunFill /> : <FiSun />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center space-x-1">
              <span className="text-lg">🛒</span>
              <span className="font-bold text-sm">Cart</span>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="hidden lg:flex justify-around bg-[#232f3e] text-white text-sm px-4 lg:px-8 py-2 space-x-4 overflow-x-auto scrollbar-hide  ">
          {user ? (
            <>
              <span className="font-semibold">
                <div onClick={toggleDropdown} className="flex items-center">
                  <span className="mr-2">
                    {" "}
                    <IoSettings />{" "}
                  </span>
                  <FaAngleDown
                    className={`text-xl transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-270" : "rotate-0"
                    }`}
                  />
                </div>
                {isDropdownOpen && (
                  <ul className="absolute z-50 left-0 mt-2 bg-gray-800 shadow-md rounded w-40">
                    <li className="p-2 hover:bg-gray-400">
                      <Link onClick={toggleDropdown} to={"/"}>
                        Home
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-400">
                      <Link onClick={toggleDropdown} to={"/allproducts"}>
                        All Products
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-400 relative">
                      <Link
                        onClick={toggleDropdown}
                        to="/whitelist"
                        className="flex items-center gap-2"
                      >
                        Wishlist{" "}
                        <p className="relative flex items-center">
                          <AiOutlineHeart title="Your Wishlist" className="" />
                          <span className="absolute top-[-10px] right-[-10px] bg-rose-400 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                            0
                          </span>
                        </p>
                      </Link>
                    </li>
                    {user?.user?.email === "asadalam4291@gmail.com" ? (
                      <li
                        onClick={toggleDropdown}
                        className="p-2 hover:bg-gray-400 relative"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2"
                        >
                          Admin
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-400 relative flex items-center gap-2"
                    >
                      <button className="flex items-center gap-1">
                        Logout <MdLogout title="Logout" className="" />
                      </button>
                    </li>
                  </ul>
                )}
              </span>
            </>
          ) : (
            <Link to={"/login"}>
              <span className="text-rose-600 font-bold hover:text-amber-500 cursor-pointer">
                LOGIN
              </span>
            </Link>
          )}
          <span>Fresh</span>
          <span>MX Player</span>
          <span>Sell</span>
          <span>Bestsellers</span>
          <span>Today's Deals</span>
          <span>Mobiles</span>
          <span>Fashion</span>
          <span>Prime</span>
          <span>Customer Service</span>
          <span>New Releases</span>
          <span>Electronics</span>
          <span>Home & Kitchen</span>
          <span>Amazon Pay</span>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
