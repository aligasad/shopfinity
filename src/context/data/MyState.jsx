import { useContext, useEffect, useState } from "react";
import MyContext from "./myContext.jsx";
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

function myState({ children }) {
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
      return toast.error("Please fill all fields");
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
    setLoading(true)
    try {
      const result = await getDocs(collection(firebaseDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUsers(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

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
        users, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useData() {
  return useContext(MyContext);
}

export default myState;
