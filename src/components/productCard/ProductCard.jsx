import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { addToWishlist, deleteFromWishlist } from "../../redux/WishlistSlice";

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
  console.log("ITEMS: ",product);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);
  console.log("cartItems", cartItems);

  // const addCart = (product) => {
  //   dispatch(addToCart(product));
  //   toast.success("Item added to cart");
  // };
  // add to cart if item is not already present
  const addCart = (product) => {
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
  };
  // add to wishlist if item is not already present
  const addWishlist = (product) => {
    const existingItem = wishListitems.some((item) => {
      return item.id === product.id;
    });
    console.log("EXISTING", existingItem);
    if (!existingItem) {
      dispatch(addToWishlist(product));
      toast.success("Item added to wishlist");
      // setIsWished(!isWished);
    } else {
      toast.warning("Item already added!");
    }
  };

  

  
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("wishlist", JSON.stringify(wishListitems));
  }, [cartItems, wishListitems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                // <div
                //   key={index}
                //   className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 drop-shadow-lg"

                // >
                //   <div
                //     className="h-full border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#2E3137]"
                //     style={{
                //       backgroundColor: mode === "dark" ? "#232F3E" : "#FFFFFF",
                //       color: mode === "dark" ? "#FFFFFF" : "#000000",
                //     }}
                //   >
                //     <div
                //     onClick={() => (window.location.href = `/productinfo/${id}`)}
                //     className="flex justify-center overflow-hidden">
                //       <img
                //         className="rounded-t-2xl w-full h-64 object-top object-cover hover:scale-105 transition-transform duration-300"
                //         src={imageUrl}
                //         alt="product"
                //       />
                //     </div>

                //     <div className="p-5 border-t border-gray-200 dark:border-gray-600">
                //       <h1 className="text-lg font-bold text-gray-700 "
                //       style={{ color: mode === "dark" ? "#FFD814" : "" }}>
                //         {title.slice(0, 20)}....
                //       </h1>
                //       <p className="text-gray-500 text-sm">{category}</p>
                //       <div className="flex items-baseline gap-1 mb-2">
                //         <p className="text-base font-bold text-red-600 mt-1">
                //          ₹{calcOffer(Number(price))}
                //         </p>
                //         <p className="text-[0.92rem] font-semibold text-amber-600  line-through">₹{price}</p>
                //       </div>

                //       <button
                //         onClick={() => addCart(item)}
                //         className="w-full py-2 text-sm font-semibold rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                //       >
                //         Add to Cart
                //       </button>
                //     </div>
                //   </div>
                // </div>

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
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isWished ? "red" : "currentColor"}
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-gray-600 dark:text-white"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.75C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
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
