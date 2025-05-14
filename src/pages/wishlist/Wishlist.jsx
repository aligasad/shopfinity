import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { deleteFromWishlist } from "../../redux/WishlistSlice";
import NoOrderFound from "../../components/noorder/NoOrderFound";

function Cart() {
  const context = useData();
  const { mode, calcOffer } = context;
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist);
  console.log("Wishlist Items", wishlistItems);

  // add to cart if item is not already present
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));
  const addCart = (product) => {
    if (user) {
      const existingItem = cartItems.some((item) => {
        return item.id === product.id;
      });
      // console.log("EXISTING", existingItem);
      if (!existingItem) {
        dispatch(addToCart(product));
        toast.info("Item added to cart");
      } else {
        toast.warning("Item already added!");
      }
    } else {
      toast.warning("Please login first!");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // delete item from wishlist----------------
  const deleteWishlist = (item) => {
    dispatch(deleteFromWishlist(item));
    toast.error("delete item sucessfully");
  };
  // also delete from local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Go to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="h-full lg:h-screen bg-gray-100 pt-5 "
      style={{
        backgroundColor: mode === "dark" ? "#282c34" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="mb-10 text-center text-2xl font-bold">Wishlist Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-3/4 max-h-[80vh] overflow-y-auto ">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item, index) => {
              const { title, price, imageUrl, description, id } = item;
              // console.log("ID CARD WL", id);
              return (
                <div
                  key={index}
                  className="justify-between relative mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    onClick={() =>
                      (window.location.href = `/productinfo/${id}`)
                    }
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40 cursor-pointer"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <h2
                        className="text-sm  text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {description}
                      </h2>
                      <div className="flex items-baseline gap-3">
                          <p className="text-xl font-bold text-red-600 mt-1">
                            ₹{calcOffer(Number(price))}
                          </p>
                          <p className="text-base font-semibold text-amber-600  line-through">
                            ₹{price}
                          </p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <RiDeleteBin6Fill
                        onClick={() => deleteWishlist(item)}
                        className="text-2xl cursor-pointer hover:text-amber-600"
                      />
                    </div>

                    <div className="absolute right-[20px] bottom-[20px]">
                      <button
                        onClick={() => addCart(item)}
                        className="flex-1 py-2 mr-2 text-sm font-semibold rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 cursor-pointer w-25 sm:w-40"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoOrderFound />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
