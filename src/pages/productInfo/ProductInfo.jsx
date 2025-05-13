import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import { addToWishlist } from "../../redux/WishlistSlice";

function ProductInfo() {
  const context = useData();
  const [isWished, setIsWished] = useState(false);
  const { loading, setLoading, calcOffer } = context;

  const [products, setProducts] = useState("");
  const params = useParams();
  // console.log(products.title)

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(firebaseDB, "products", params.id));
      // console.log(productTemp)
      setProducts(productTemp.data());
      // console.log(productTemp.data())
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);
  // console.log(cartItems);

  // add to cart if item is not already present
  const user = JSON.parse(localStorage.getItem("user"));
  const addCart = (product) => {
    if (user) {
      const existingItem = cartItems.some((item) => {
        return item.id === product.id;
      });
      console.log("EXISTING", existingItem);
      if (!existingItem) {
        dispatch(addToCart(product));
        toast.success("Item added to cart");
      } else {
        toast.warning("Item already added!");
      }
    } else {
      toast.warning("Please login first!");
    }
  };
  // add to wishlist if item is not already present
  const addWishlist = (product) => {
    if (user) {
      const existingItem = wishListitems.some((item) => {
        return item.id === product.id;
      });
      // console.log("EXISTING", existingItem);
      if (!existingItem) {
        dispatch(addToWishlist(product));
        toast.success("Item added to wishlist");
        setIsWished(!isWished);
      } else {
        toast.warning("Item already added!");
      }
    } else {
      toast.warning("Please Login First !");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishListitems));
  }, [cartItems, wishListitems]);

  // add to wishlist

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-32 mx-auto">
        {products && (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <img
                alt="ecommerce"
                className=" w-full max-h-[80vh] object-contain rounded"
                src={products.imageUrl}
              />
              <div>
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  WANDERLUST
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {products.title}
                </h1>
                <h2 className="text-sm title-font text-yellow-600 font-semibold tracking-widest">
                  {products.category.toUpperCase()}
                </h2>
                <div className="flex flex-wrap items-center mb-4">
                  <span className="flex items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    <FaRegStar />
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-auto space-x-3 border-l-2 border-gray-200 pl-3">
                    {/* Social icons */}
                    {/* Copy same icons as before */}
                  </span>
                </div>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {products.description}
                </p>
                <div className="flex flex-wrap items-center">
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      ₹{calcOffer(Number(products.price))}
                    </p>
                    <p className="text-xl font-semibold text-gray-500 line-through">
                      ₹{products.price}
                    </p>
                  </div>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-4 lg:mt-0 cursor-pointer"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => addWishlist(products)}
                    className="rounded-full w-10 h-10 bg-gray-200 border-0 inline-flex items-center justify-center text-gray-500 ml-4 mt-4 lg:mt-0"
                  >
                    <svg
                      fill={isWished ? "red" : "currentColor"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductInfo;
