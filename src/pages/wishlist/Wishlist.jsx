import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { deleteFromWishlist } from "../../redux/WishlistSlice";

function Cart() {
  const context = useData();
  const { mode, calcOffer } = context;
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist);
  console.log("Wishlist Items", wishlistItems);

  // delete item from cart----------------
  const deleteWishlist = (item) => {
    dispatch(deleteFromWishlist(item));
    toast.warning("delete item sucessfully");
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
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 max-h-[80vh] overflow-y-auto ">
          {wishlistItems.map((item, index) => {
            const { title, price, imageUrl, description } = item;
            return (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <img
                  src={imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
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
                    <p
                      className="mt-1 text-xs font-semibold text-gray-700 flex items-baseline "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      <div className="flex items-baseline gap-3">
                        <p className="text-xl font-bold text-red-600 mt-1">
                          ₹{calcOffer(Number(price))}
                        </p>
                        <p className="text-base font-semibold text-amber-600  line-through">
                          ₹{price}
                        </p>
                      </div>
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <RiDeleteBin6Fill
                      onClick={() => deleteWishlist(item)}
                      className="text-2xl cursor-pointer hover:text-amber-600"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cart;
