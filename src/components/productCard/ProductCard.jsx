import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { addToWishlist, deleteFromWishlist } from "../../redux/WishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

function ProductCard() {
  const context = useData();
  const [isWished, setIsWished] = useState(false);
  
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer,
  } = context;
  // console.log("ITEMS: ",product);
  // ====================={R E D U X - P A R T}===============================
  const dispatch = useDispatch();  //Returns the dispatch function from the Redux store
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);
  // =============================================================
  console.log("cartItems", cartItems);
  console.log("Wish List", wishListitems);
  console.log("SELECTED",isWished);

  const user = JSON.parse(localStorage.getItem("user"));
  // add to cart if item is not already present
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
        console.log("SELECTED",isWished);
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Products
          </h1>
          <div className="h-1 w-20 bg-yellow-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter(
              (item) =>
                item.title
                  .toLowerCase()
                  .includes(
                    searchkey.toLowerCase().trim().replace(/\s+/g, " ")
                  ) ||
                item.type
                  .toLowerCase()
                  .includes(searchkey.toLowerCase().trim().replace(/\s+/g, " "))
            )
            .filter((item) =>
              item.category
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(filterType)
            )
            .slice(0, 10)
            .filter((obj) => obj.price.trim().includes(filterPrice))
            .map((item, index) => {
              const {
                title,
                price,
                imageUrl,
                id,
                category,
                description,
                date,
              } = item;
              return (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                >
                  <div
                    className="h-full border border-gray-200 rounded-md shadow-gray-300 bg-white hover:shadow-lg transition-shadow hover:shadow-gray-600 duration-300"
                    style={{
                      backgroundColor: mode === "dark" ? "#232F3E" : "#FFFFFF",
                      color: mode === "dark" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <div className="flex justify-center items-center p-4">
                      <img
                        onClick={() =>
                          (window.location.href = `/productinfo/${id}`)
                        }
                        className="h-36 sm:h-44 object-contain transition-transform rounded-md duration-300 hover:scale-110 cursor-pointer"
                        src={imageUrl}
                        alt={title}
                      />
                    </div>
                    <div className=" px-2 md:px-4 pb-4 border-t border-gray-100 dark:border-gray-600">
                      <p
                        className="text-xs text-gray-500 mt-2 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {category}
                      </p>
                      <h2
                        className="text-sm font-semibold truncate"
                        style={{ color: mode === "dark" ? "#FFD814" : "" }}
                      >
                        {title}
                      </h2>
                      <div className="flex items-baseline gap-1">
                        <p
                          className="text-[14px] md:text-base font-bold text-red-600 mt-1"
                          style={{ color: mode === "dark" ? "#D97706" : "" }}
                        >
                          ₹{calcOffer(Number(price))}
                        </p>
                        <p
                          className="text-[12px] md:text-sm font-semibold text-gray-600 line-through"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => addCart(item)}
                          className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm md:flex-1 font-semibold rounded-lg  bg-orange-600 hover:bg-orange-700 text-black hover:text-white transition duration-300 cursor-pointer"
                        >
                          Add to Cart
                        </button>

                        <button
                          onClick={() => addWishlist(item)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center dark:bg-gray-700 dark:hover:bg-gray-600 transition cursor-pointer"
                        >
                          <FaHeart className="text-base sm:text-xl text-white hover:text-orange-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
