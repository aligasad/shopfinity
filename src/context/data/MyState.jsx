import { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext.jsx";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig.jsx";
import { toast } from "react-toastify";

function MyState({ children }) {
  // For toggling dark & light mode...
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 34, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // For Loading...
  const [loading, setLoading] = useState(false);

  // --------------------- AddProduct Function and get Product Function ---------------------
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  // ------------- Add Product Section -------------------------------
  const addProduct = async () => {
    if (
      products.title === null ||
      products.price === null ||
      products.imageUrl === null ||
      products.category === null ||
      products.description === null
    ) {
      return toast.warning("Please fill all fields");
    }

    setLoading(true);
    try {
      const productRef = collection(firebaseDB, "products");
      await addDoc(productRef, products);
      toast.success("Product Added Successfully!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      });
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // -------------GET PRODUCT(hame firebase database se data lake ke dega) -----------
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firebaseDB, "products"),
        //It returns data after sorting according to its time
        orderBy("time")
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Update and Delete peoducts only admine can do it-------------------------
  //update product function ----------------------
  const editHandle = (item) => {
    setProducts(item);
  };
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(firebaseDB, "products", products.id), products);
      toast.success("Product Updated Successfully!");
      getProductData();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //delete product function --------------------
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(firebaseDB, "products", item.id));
      toast.warning("Product Deleted Successfully!");
      setLoading(false);
      getProductData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // orderedData function------------------
  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);

  const [users, setUsers] = useState([]);
  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUsers(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [searchkey1, setSearchkey1] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // FOR FINDING CURRENT LOCATION----------------------
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "3818f79df26b48559714cb5d0ecc5bfe";
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          // Reverse geocode
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                setAddress(data.results[0].formatted);
              } else {
                setError("No address found.");
              }
            })
            .catch((err) => {
              setError("Error fetching address.");
            });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // =======================FINDING PAGE============================
  const [pageType, setPageType] = useState("");
  // ================================================================

  // =================================================
  // Offer on Product Function----------------------
  const calcOffer = (price) => {
    let discount = 0;

    if (price >= 1000) {
      discount = 0.2;
    } else if (price >= 500) {
      discount = 0.1;
    } else if (price >= 100) {
      discount = 0.05;
    }

    const discountedPrice = price - price * discount;
    return discountedPrice.toFixed(2);
  };

  // =================================================

  function resetFilter() {
    setSearchkey("");
    setFilterPrice("");
    setFilterType("");
  }

  // =============FOR ANIMATION{framer motion}================



  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        editHandle,
        updateProduct,
        deleteProduct,
        order,
        users,
        searchkey,
        setSearchkey,
        searchkey1,
        setSearchkey1,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        address,
        calcOffer,
        resetFilter,
        pageType,
        setPageType,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useData() {
  return useContext(MyContext);
}

export default MyState;
