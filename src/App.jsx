import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/wishlist/Wishlist.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import MyState from "./context/data/MyState.jsx";
import Login from "./pages/registration/Login.jsx";
import Signup from "./pages/registration/Signup.jsx";
import ProductInfo from "./pages/productInfo/ProductInfo.jsx";
import AddProduct from "./pages/admin/page/AddProduct.jsx";
import UpdateProduct from "./pages/admin/page/UpdateProduct.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import AuthProvider from "./components/protector/AuthContext.jsx";
import ProtectedRoute from "./components/protector/ProtectedRoute.jsx";
import Allproducts from "./pages/allproducts/Allproducts.jsx";
import Kids from "./pages/allproducts/Kids/Kids.jsx";
import Mobile from "./pages/allproducts/Mobile/Mobile.jsx";
import Cloths from "./pages/allproducts/Cloths/Cloths.jsx";
import HomeKitchen from "./pages/allproducts/Home & Kitchen/HomeKitchen.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",

          element: (
            <ProtectedRoute>
              <Cart />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/productinfo/:id",
          element: <ProductInfo />,
        },
        {
          path: "/allproducts",
          element: <Allproducts />,
        },
        {
          path: "/kids",
          element: <Kids />,
        },
        {
          path: "/cloths",
          element: <Cloths />,
        },
        {
          path: "/mobile",
          element: <Mobile />,
        },
        {
          path: "/homekitchen",
          element: <HomeKitchen />,
        },
        {
          path: "/addproduct",
          element: (
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/updateproduct",
          element: (
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/*",
          element: <NoPage />,
        },
      ],
    },
  ]);
  return (
    <AnimatePresence mode="wait">
      <AuthProvider>
        <MyState>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            theme="dark"
            transition={Bounce}
          />
        </MyState>
      </AuthProvider>
    </AnimatePresence>
  );
}

export default App;

// for admin protector
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (
    admin.user.email === "asadalam4291@gmail.com" ||
    admin.user.email === "asadalamalig@gmail.com"
  ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
