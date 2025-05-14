import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  RiDeleteBin6Fill,
  RiDiscountPercentFill,
  RiDiscountPercentLine,
} from "react-icons/ri";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import { deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { BsEmojiSunglasses } from "react-icons/bs";
import NoOrderFound from "../../components/noorder/NoOrderFound";

function Cart() {
  const context = useData();
  const { mode, calcOffer } = context;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // delete item from cart----------------
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.warning("delete item sucessfully");
  };
  // also delete from local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // For calculating total amount of all product-------------
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + parseFloat(calcOffer(cartItem.price));
    });
    setTotalAmount(temp);
    console.log(temp);
  }, [cartItems]);

  // Calculate GST----------------------------------
  const calcGST = (price) => {
    let discount = 0.18;
    const discountedPrice = price * discount;
    return discountedPrice.toFixed(2);
  };
  const GST = calcGST(totalAmount);
  const shipping = Number(100);
  const grandTotal =
    Number(totalAmount) > 0 ? totalAmount + shipping + Number(GST) : 0;

  const overallDiscount = parseFloat(grandTotal - grandTotal * 0.1);

  // =============================================================================
  // ----------------------------PAYMENT INTEGRATION CODE ------------------------
  // =============================================================================
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required");
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    // Payment Integration Main CODE-------------
    var options = {
      key: "rzp_test_rmJprKHkqwT85l",
      key_secret: "7vqkNgOjwnfx8a13WysHFoiV",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", // Amazon-like logo
      order_receipt: "order_rcptid_" + name,
      name: "Amazon",
      description: "Secured Payment Dude ",
      // It handle payment is sucessfull or not
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;

        // store order information into firebase- - -  - -- - -  -- --
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          // In One line
          // const result = addDoc(collection(firebaseDB, "orders"), orderInfo)
          // In two line
          const orderRef = collection(firebaseDB, "orders");
          addDoc(orderRef, orderInfo);
          addDoc;
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#FF9900", // Amazon's brand color
        hide_topbar: false,
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  // Go to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
          {cartItems.length > 0 ? cartItems.map((item, index) => {
            const { title, price, imageUrl, description, id } = item;
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
                  onClick={() => window.location.href = `/productinfo/${id}`}
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
                      <span className="text-xl font-bold text-red-600 mt-1">
                        ₹{calcOffer(Number(price))}
                      </span>
                      <span className="text-base font-semibold text-amber-600  line-through">
                        ₹{price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <RiDeleteBin6Fill
                      onClick={() => deleteCart(item)}
                      className="text-2xl cursor-pointer hover:text-amber-600"
                    />
                  </div>
                </div>
              </div>
            );
          }) : <NoOrderFound />}
        </div>

        {/* TOTAL AMOUT OF ALL ITEM CARD */}
        <div
          className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          style={{
            backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="mb-2 flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Subtotal
            </p>
            <p
              className="text-gray-700  flex items-center"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              <FaIndianRupeeSign />
              {totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="mb-2 flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              GST <span className="text-rose-600 font-bold">18%</span>
            </p>
            <p
              className="text-gray-700  flex items-center"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              <FaIndianRupeeSign />
              {GST}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Shipping
            </p>
            <p
              className="text-gray-700 font-semibold flex items-center"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              <FaIndianRupeeSign />
              {shipping.toFixed(2)}
            </p>
          </div>
          <hr className="my-4" />
          <p
            className="text-base ml-5 mb-3 font-bold text-red-500 flex gap-1 items-center "
            style={{ color: mode === "dark" ? "#FF5733" : "" }}
          >
            Special Discount by our team{" "}
            <BsEmojiSunglasses className="text-xl text-black" />
          </p>

          <div className="flex justify-between mb-3">
            <div>
              <p
                className="text-base font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Overall Discount <span className=" text-amber-700">10%</span>
              </p>
            </div>
            <div className="text-base font-bold line-through ">
              <p
                className="mb-1 text-base font-bold flex text-red-500  items-center"
                style={{ color: mode === "dark" ? "#FF5733" : "" }}
              >
                <FaIndianRupeeSign />
                {grandTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <hr />
          <div className="flex justify-between mb-3">
            <div>
              <p
                className="text-lg font-bold flex items-center justify-center"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Grand Total :
              </p>
            </div>
            <div className="text-lg font-bold">
              <p
                className="mb-1 text-lg font-bold flex items-center"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                <FaIndianRupeeSign />
                {overallDiscount.toFixed(2)}
              </p>
            </div>
          </div>

          <Modal
            name={name}
            address={address}
            pincode={pincode}
            phoneNumber={phoneNumber}
            setName={setName}
            setAddress={setAddress}
            setPincode={setPincode}
            setPhoneNumber={setPhoneNumber}
            buyNow={buyNow}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
