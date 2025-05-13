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
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);
  console.log("cartItems", cartItems);
  console.log("Wish List", wishListitems);

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
            .filter((item) => item.title.toLowerCase().includes(searchkey))
            .filter((item) =>
              item.category
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(filterType)
            )
            .slice(0, 8)
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
                  className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 drop-shadow-lg"
                >
                  <div
                    className="h-full border border-gray-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#232F3E]"
                    style={{
                      backgroundColor: mode === "dark" ? "#232F3E" : "#FFFFFF",
                      color: mode === "dark" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${id}`)
                      }
                      className="flex justify-center overflow-hidden cursor-pointer"
                    >
                      <img
                        className="rounded-t-xl w-full h-64 object-top object-cover hover:scale-105 transition-transform duration-300"
                        src={imageUrl}
                        alt="product"
                      />
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                      <h1 className="text-lg font-bold text-gray-800 dark:text-yellow-300">
                        {title.slice(0, 20)}...
                      </h1>
                      <p className="text-gray-500 text-sm">{category}</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-base font-bold text-red-600 mt-1">
                          ₹{calcOffer(Number(price))}
                        </p>
                        <p className="text-sm font-semibold text-gray-500 line-through">
                          ₹{price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => addCart(item)}
                          className="flex-1 py-2 mr-2 text-sm font-semibold rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300"
                        >
                          Add to Cart
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => addWishlist(item)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center dark:bg-gray-700 dark:hover:bg-gray-600 transition"
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
  );
}

export default ProductCard;
