import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Link, Links, useNavigate } from "react-router-dom";
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
                  <div onClick={() => setOpen(false)} className="flow-root">
                    <Link
                      onClick={resetFilter}
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Home
                    </Link>
                  </div>
                  <ul className="mt-[-25px]">
                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={"/allproducts"}
                        className=" block font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>All Products</li>{" "}
                      </Link>
                    </div>

                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={"orders"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Orders</li>{" "}
                      </Link>
                    </div>

                    <div onClick={() => setOpen(false)}>
                      <Link to="/wishlist" className="flex items-center gap-2">
                        <li className="font-semibold">Wishlist </li>
                        <p className="relative flex items-center">
                          <AiFillHeart
                            title="Your Wishlist"
                            className="text-2xl text-amber-700"
                          />
                          <span className="absolute top-[-10px] right-[-10px] bg-amber-500 font-bold text-black rounded-full w-5 h-5 flex justify-center items-center text-xs">
                            {wishListitems.length}
                          </span>
                        </p>
                      </Link>
                    </div>

                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={"/mobile"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Mobile Phone</li>{" "}
                      </Link>
                    </div>
                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={"/kids"}
                        className=" font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Kids</li>{" "}
                      </Link>
                    </div>
                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={"/cloths"}
                        className=" font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Cloths</li>{" "}
                      </Link>
                    </div>

                    {/*----------------- FROM HERE YOU CAN ADD NAV SECTION----------------------- */}
                    {/* <div onClick={() => setOpen(false)}>
                      <Link
                        to={""}
                        className=" font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Appliance</li>{" "}
                      </Link>
                    </div>
                    <div onClick={() => setOpen(false)}>
                      <Link
                        to={""}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        <li>Appliance</li>{" "}
                      </Link>
                    </div> */}
                    {user?.user?.email === "asadalam4291@gmail.com" ? (
                      <div onClick={() => setOpen(false)}>
                        <Link
                          to={"/dashboard"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          <li className="text-red-600">ADMINE</li>{" "}
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                    {user ? (
                      <div onClick={() => setOpen(false)}>
                        <Link
                          to={"/"}
                          onClick={handleLogout}
                          className="-m-2 block p-2 font-medium text-gray-900"
                          style={{ color: mode === "dark" ? "yellow" : "" }}
                        >
                          <li>Logout</li>{" "}
                        </Link>
                      </div>
                    ) : (
                      <div onClick={() => setOpen(false)}>
                        <Link
                          to={"/login"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                          style={{ color: mode === "dark" ? "red" : "" }}
                        >
                          <li>Login</li>{" "}
                        </Link>
                      </div>
                    )}
                  </ul>

                  {/* <div onClick={() => setOpen(false)} className="flow-root">
                    <Link
                      onClick={resetFilter}
                      to={"/allproducts"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    ></Link>
                  </div> */}
                  {/* <div onClick={() => setOpen(false)} className="flow-root">
                    <Link
                      to={"/orders"}
                      style={{ color: mode === "dark" ? "white" : "" }}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Order
                    </Link>
                  </div> */}
                  {/* <div onClick={() => setOpen(false)} className="flow-root">
                    <Link to="/wishlist" className="flex items-center gap-2">
                      Wishlist{" "}
                      <p className="relative flex items-center">
                        <AiFillHeart
                          title="Your Wishlist"
                          className="text-2xl text-amber-700"
                        />
                        <span className="absolute top-[-10px] right-[-10px] bg-amber-500 font-bold text-black rounded-full w-5 h-5 flex justify-center items-center text-xs">
                          {wishListitems.length}
                        </span>
                      </p>
                    </Link>
                  </div> */}

                  {/* {user?.user?.email === "asadalam4291@gmail.com" ? (
                    <div onClick={() => setOpen(false)} className="flow-root">
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
                  )} */}
                  {/* {user ? (
                    <div onClick={() => setOpen(false)} className="flow-root">
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
                    <div onClick={() => setOpen(false)} className="flow-root">
                      <Link
                        to={"/login"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Login
                      </Link>
                    </div>
                  )} */}

                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        <img
                          className="inline-block w-10 h-10 rounded-full"
                          src="https://up.yimg.com/ib/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&rs=1&c=1&qlt=95&w=111&h=111"
                          alt="Dan_Abromov"
                        />
                        <p
                          className=""
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {user?.user?.email}
                        </p>
                      </div>
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
            <Link
              onClick={resetFilter}
              to="/"
              className="text-yellow-400 font-bold text-2xl"
            >
              Amazon
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
            <span>Mobile</span>{" "}
          </Link>
          <Link to={"/cloths"} onClick={resetFilter}>
            {" "}
            <span>Cloths</span>{" "}
          </Link>
          <Link
            to={"/homekitchen"}
          >
            {" "}
            <span>Home & Kitchen</span>{" "}
          </Link>
          <Link to={"https://www.amazon.in/deals?ref_=nav_cs_gb"}>
            {" "}
            <span>Today's Deals</span>{" "}
          </Link>
          <Link
            to={
              "https://www.amazon.in/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles"
            }
          >
            {" "}
            <span>Mobiles</span>{" "}
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
