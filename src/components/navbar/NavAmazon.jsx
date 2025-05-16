import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Home, User, Layers, ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
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
    address,
    resetFilter,
    pageType,
    setPageType,
  } = context;
  console.log("PAGE TYPE", pageType);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fullAddress = address || "";
    const shortAddress = fullAddress.split(" ").slice(0, 3).join(" ");
    setLocation(shortAddress);
  }, [address]); // Only re-run when address changes

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
    // localStorage.clear("cart");
    toast.success("Logout Successfully!");
  }

  // For loggedIn user information--------------
  const user = JSON.parse(localStorage.getItem("user"));

  // cartItems data---------------------
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);

  // Finding all types-------------------------------------------
  const [types, setTypes] = useState([]);
  function getTypes() {
    const typo = [...new Set(product.map((item) => item.type))];
    // const typo1 = [...new Set(product.map((item) => item.type))];
    setTypes(typo);
  }
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, window.innerHeight * 0.4);
    getTypes();
  }, [searchkey, filterType, product]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // ----------------{FOR BOTTOM MENU WILL HIDE WHEN WE SCROLL DOWN}-----------------------------
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (menuOpen === true) {
  //       if (currentScrollY > lastScrollY && currentScrollY > 50) {
  //         setShowNavbar(false); // Scrolling down
  //       } else {
  //         setShowNavbar(true); // Scrolling up
  //       }
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [menuOpen, lastScrollY]);

  // // Lock body scroll when menu is open
  // useEffect(() => {
  //   if (menuOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [menuOpen]);

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 z-50 h-full flex items-end ">
          <div
            className="flex-grow bg-black bg-opacity-40 "
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="w-64 h-[50%]  bg-white shadow-lg p-4 py-5 mb-20 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: mode === "dark" ? "#374151" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <ul className="space-y-4">
              <li className="text-gray-700" onClick={() => setMenuOpen(false)}>
                <Link
                  to={"/orders"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Your Orders
                </Link>
              </li>
              <li className="text-gray-700" onClick={() => setMenuOpen(false)}>
                <Link
                  onClick={toggleDropdown}
                  to="/wishlist"
                  className="flex items-center gap-2"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Wishlist{" "}
                  <p className="relative flex items-center">
                    <AiFillHeart
                      title="Your Wishlist"
                      className="text-xl text-amber-700"
                    />
                    <span className="absolute top-[-8px] right-[-8px] bg-amber-500 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                      {wishListitems.length}
                    </span>
                  </p>
                </Link>
              </li>
              <li
                className="text-gray-700"
                onClick={() => setMenuOpen(false)}
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Account Settings X
              </li>
              {user?.user?.email === "asadalam4291@gmail.com" ? (
                <li
                  className="text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link
                    to={"/dashboard"}
                    className="font-bold"
                    style={{ color: mode === "dark" ? "red" : "" }}
                  >
                    ADMINE
                  </Link>
                </li>
              ) : (
                ""
              )}
              {user ? (
                <li
                  className=" hover:bg-gray-400 relative flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1"
                  >
                    Logout <MdLogout title="Logout" className="" />
                  </button>
                </li>
              ) : (
                <li onClick={() => setMenuOpen(false)}>
                  {" "}
                  <button className="flex items-center gap-1">
                    <Link to={"/login"}>Login</Link>
                  </button>
                </li>
              )}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <X
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div
        className=" sm:hidden fixed top-0 left-0 w-full border-b shadow-md bg-white px-4 py-2"
        style={{
          backgroundColor: mode === "dark" ? "#374151" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchkey(e.target.value)}
          placeholder="Search a product"
          className="w-full p-2 rounded-md border outline-none border-gray-300 "
          style={{
            color: mode === "dark" ? "white" : "",
          }}
        />
        {/* Theme Toggle */}
        <button
          onClick={toggleMode}
          className="fixed top-[8.5px] right-1 z-50 text-xl p-[10px] rounded-md bg-amber-600 "
        >
          {mode === "dark" ? <BsFillCloudSunFill /> : <FiSun />}
        </button>
      </div>

      {/* Spacer for search bar */}
      <div className="h-[58px] sm:hidden" />

      {/* Horizontal Scroll Menu - visible only on small screens */}
      <div
        className="sm:hidden overflow-x-auto whitespace-nowrap flex items-center gap-4 px-4 py-2  border-b"
        style={{
          backgroundColor: mode === "dark" ? "#374151" : "white",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="flex flex-col items-center text-xs">
          <Link to={"/kids"}>
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/24/70/of-shopping-vector-23182470.jpg"
              alt="Prime"
              className="w-10 h-8 rounded-sm object-cover object-ryight "
            />
            <span>Kids</span>
          </Link>
        </div>
        <div className="flex flex-col items-center text-xs">
          <Link to={"/mobile"}>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.kiGkC1mRT0mXLso5irnYhQHaHa&pid=Api&P=0&h=180"
              alt="Mobiles"
              className="w-10 h-8 rounded-sm object-cover "
            />
            <span>Mobile</span>
          </Link>
        </div>
        <div className=" text-xs">
          <Link to={"/cloths"} className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
              alt="Cloths"
              className="w-10 h-8 rounded-sm object-cover "
            />
            <span>Cloths</span>
          </Link>
        </div>
        <div className=" text-xs">
          <Link to={"/homekitchen"} className="flex flex-col items-center">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.VvmxgBX8pTBnN6zZKDUpxwHaE8&pid=Api&P=0&h=180"
              alt="Deals"
              className="w-10 h-8 rounded-sm object-cover "
            />
            <span>Home&Kitchen</span>
          </Link>
        </div>
        <div className="flex flex-col items-center text-xs">
          <Link to={"/shoes"}>
            <img
              src="https://ae01.alicdn.com/kf/HTB1Qg4XruOSBuNjy0Fdq6zDnVXaE/2018-Luxury-Brand-Men-s-Casual-Breathable-Shoes-for-Male-Winter-Spring-Male-Shoes-Men-Comfortable.jpg"
              alt="Shoes"
              className="w-10 h-8 rounded-sm object-cover "
            />
            <span>Shoes</span>
          </Link>
        </div>

        <div className="flex flex-col items-center text-xs">
          <Link to={'/electronics'}>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.SyB8lZTvZUxvm6J0HwrhigHaES&pid=Api&P=0&h=180"
              alt="Lorem"
              className="w-10 h-8 rounded-sm object-cover "
            />
            <span>Electronics</span>
          </Link>
        </div>
        <div className="flex flex-col items-center text-xs">
          <img
            src="https://picsum.photos/11"
            alt="Lorem"
            className="w-10 h-8 rounded-sm object-cover "
          />
          <span>Lorem</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <img
            src="https://picsum.photos/12"
            alt="Lorem"
            className="w-10 h-8 rounded-sm object-cover "
          />
          <span>Lorem</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <img
            src="https://picsum.photos/100"
            alt="Lorem"
            className="w-10 h-8 rounded-sm object-cover "
          />
          <span>Lorem</span>
        </div>
        <div className="flex flex-col items-center text-xs">
          <img
            src="https://picsum.photos/100"
            alt="Lorem"
            className="w-10 h-8 rounded-sm object-cover "
          />
          <span>Lorem</span>
        </div>
        {/* Add more items as needed */}
      </div>

      {/* Bottom Navbar */}
      <div
        className={`lg:hidden fixed bottom-[-60px] left-0 w-full z-40  border-t shadow-md transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ backgroundColor: mode === "dark" ? "#374151" : "white" }}
      >
        <div className="flex justify-between items-start h-30 mt-2 px-6 py-2">
          <div className=" text-xs text-gray-700">
            <Link className="flex flex-col items-center" to={"/"} style={{ color: mode === "dark" ? "white" : "" }}>
              <Home className="h-6 w-6" />
              <span>Home</span>
            </Link>
          </div>
          <div className=" text-xs text-gray-700">
            <Link className="flex flex-col items-center" style={{ color: mode === "dark" ? "white" : "" }}>
              <User className="h-6 w-6" />
              <span>You</span>
            </Link>
          </div>
          <div className=" text-xs text-gray-700">
            <Link className="flex flex-col items-center" style={{ color: mode === "dark" ? "white" : "" }}>
              <Layers className="h-6 w-6" />
              <span>More</span>
            </Link>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-700">
            {/* <Link to={"/cart"}>
              <ShoppingCart className="h-6 w-6" />
              <span>Cart</span>
            </Link> */}

            <Link
              to="/cart"
              className="relative flex items-center space-x-1"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              <span className="font-bold text-sm flex flex-col items-center">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-semibold">Cart</span>
              </span>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            </Link>
          </div>
          <div
            className="flex flex-col items-center text-xs text-gray-700 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <Link className="flex flex-col items-center" style={{ color: mode === "dark" ? "white" : "" }}>
              <Menu className="h-6 w-6" />
              <span>Menu</span>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================={ D E S K T O P N A V}==================================== */}

      {/* desktop  */}
      <header className="hidden md:block bg-[#131921] text-white w-full shadow-md">
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
            <Link
              onClick={resetFilter}
              to="/"
              className="text-yellow-400 font-bold text-2xl"
            >
              Shopfinity
            </Link>
            <div className="hidden md:flex flex-col leading-tight text-sm">
              <div>{location}</div>
              <button className="text-white hover:underline text-xs">
                Current location
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
              <option value="">All Products</option>
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
            <button
              onClick={resetFilter}
              className="bg-yellow-400 px-4 rounded-r-md text-black"
            >
              Reset
            </button>
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
              <select className="outline ml-1" name="" id="">
                <option className="bg-gray-500 " value="">
                  UP
                </option>
                <option className="bg-gray-500 " value="">
                  BR
                </option>
                <option className="bg-gray-500 " value="">
                  J&K
                </option>
                <option className="bg-gray-500 " value="">
                  MH
                </option>
              </select>
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
                        to="/wishlist"
                        className="flex items-center gap-2"
                      >
                        Wishlist{" "}
                        <p className="relative flex items-center">
                          <AiFillHeart
                            title="Your Wishlist"
                            className="text-xl text-amber-700"
                          />
                          <span className="absolute top-[-8px] right-[-8px] bg-amber-500 font-bold text-black rounded-full w-4 h-4 flex justify-center items-center text-xs">
                            {wishListitems.length}
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
              <span
                onClick={window.scrollTo(0, 0)}
                className="text-rose-600 font-bold hover:text-amber-500 cursor-pointer"
              >
                LOGIN
              </span>
            </Link>
          )}

          <Link to={"/"} onClick={resetFilter}>
            {" "}
            <span className="text-amber-500 font-bold hover:text-green-500">
              Home
            </span>{" "}
          </Link>

          <Link to={"/kids"} onClick={resetFilter}>
            {" "}
            <span>Kids</span>{" "}
          </Link>

          <Link to={"/mobile"} onClick={resetFilter}>
            {" "}
            <span>Mobiles</span>{" "}
          </Link>
          <Link to={"/cloths"} onClick={resetFilter}>
            {" "}
            <span>Cloths</span>{" "}
          </Link>
          <Link to={"/homekitchen"} onClick={resetFilter}>
            {" "}
            <span>Home & Kitchen</span>{" "}
          </Link>
          <Link to={"/electronics"}onClick={resetFilter}>
            {" "}
            <span onClick={resetFilter}>Electronics</span>{" "}
          </Link>
          <Link
            to={
              "Shoes"
            }
          >
            {" "}
            <span>Shoes</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/gp/browse.html?node=6648217031&ref_=nav_cs_fashion"
            }
          >
            {" "}
            <span>Fashion</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/amazonprime?ref_=nav_cs_primelink_nonmember"
            }
          >
            {" "}
            <span className="font-semibold  text-amber-500">Prime</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590&ref_=nav_cs_help"
            }
          >
            {" "}
            <span>Customer Service</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/gp/new-releases/?ref_=nav_cs_newreleases"
            }
          >
            {" "}
            <span>New Releases</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/electronics/b/?ie=UTF8&node=976419031&ref_=nav_cs_electronics"
            }
          >
            {" "}
            <span>Electronics</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/Home-Kitchen/b/?ie=UTF8&node=976442031&ref_=nav_cs_home"
            }
          >
            {" "}
            <span>Home & Kitchen</span>{" "}
          </Link>
          <Link to={"https://www.amazon.in/amazonpay/home?ref_=nav_cs_apay"}>
            {" "}
            <span>Amazon Pay</span>{" "}
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
