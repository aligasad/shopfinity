import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../../context/data/MyState.jsx";
import { addToCart } from "../../../redux/CartSlice";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import { addToWishlist } from "../../../redux/WishlistSlice";
import { motion } from "framer-motion";

function Electronics() {
  const context = useData();
  const {
    mode,
    product,
    searchkey,
    searchkey1,
    setSearchkey,
    setSearchkey1,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer,
    pageType,
    setPageType,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);
  console.log(cartItems);

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
        // setIsWished(!isWished);
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
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => setIsFirstVisit(false)}
    >
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
            Electronics Collection
            </h1>
            <div class="h-1 w-20 bg-yellow-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {product
              .filter((obj) => obj.type.toLowerCase().includes("electronic"))
              .filter(
                (obj) =>
                  obj.title.toLowerCase().includes(searchkey) ||
                  obj.type.toLowerCase().includes(searchkey)
              )
              .filter((item) =>
                item.category
                  .replace(/\s+/g, "")
                  .toLowerCase()
                  .includes(filterType)
              )
              .map((item, index) => {
                const { title, price, category, imageUrl, id } = item;
                return (
                  

                  <div
                    key={index}
                    className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                  >
                    <div
                      className="h-full border border-gray-200 rounded-md shadow-gray-300 bg-white hover:shadow-lg transition-shadow hover:shadow-gray-600 duration-300"
                      style={{
                        backgroundColor:
                          mode === "dark" ? "#232F3E" : "#FFFFFF",
                        color: mode === "dark" ? "#FFFFFF" : "#000000",
                      }}
                    >
                      <div className="flex justify-center items-center p-4">
                        <img
                          onClick={() =>
                            (window.location.href = `/productinfo/${id}`)
                          }
                          className="h-36 sm:h-44 object-contain transition-transform rounded-md duration-300 hover:scale-110 md:hover:scale-135 cursor-pointer"
                          src={imageUrl}
                          alt={title}
                        />
                      </div>
                      <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-600">
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
                            className="text-base font-bold text-red-600 mt-1"
                            style={{ color: mode === "dark" ? "#D97706" : "" }}
                          >
                            ₹{calcOffer(Number(price))}
                          </p>
                          <p className="text-[0.92rem] font-semibold text-amber-600 line-through">
                            ₹{price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => addCart(item)}
                            className="flex-1 py-2 mr-2 text-sm font-semibold rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 cursor-pointer"
                          >
                            Add to Cart
                          </button>

                          <button
                            onClick={() => addWishlist(item)}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center dark:bg-gray-700 dark:hover:bg-gray-600 transition cursor-pointer"
                          >
                            <FaHeart className="text-xl text-amber-400" />
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
    </motion.div>
  );
}

export default Electronics;
