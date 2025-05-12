import React, { useEffect } from "react";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";

function ProductCard() {
  const context = useData();
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer
  } = context;
  console.log(product);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log("cartItems", cartItems);

  // const addCart = (product) => {
  //   dispatch(addToCart(product));
  //   toast.success("Item added to cart");
  // };
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
            ).slice(0, 8).filter((obj) => obj.price.trim().includes(filterPrice)).map((item, index) => {
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
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  <div
                    className="h-full border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-[#2E3137]"
                    style={{
                      color: mode === "dark" ? "white" : "#232f3e",
                    }}
                  >
                    <div
                    onClick={() => (window.location.href = `/productinfo/${id}`)}
                    className="flex justify-center overflow-hidden">
                      <img
                        className="rounded-t-2xl w-full h-64 object-top object-cover hover:scale-105 transition-transform duration-300"
                        src={imageUrl}
                        alt="product"
                      />
                    </div>

                    <div className="p-5 border-t border-gray-200 dark:border-gray-600">
                      <h1 className="text-lg font-bold text-white ">
                        {title.slice(0, 20)}....
                      </h1>
                      <p className="text-white text-sm">{category}</p>
                      <div className="flex items-baseline gap-1 mb-2">
                        <p className="text-base font-bold text-red-600 mt-1">
                         ₹{calcOffer(Number(price))}
                        </p>
                        <p className="text-[0.92rem] font-semibold text-amber-600  line-through">₹{price}</p>
                      </div>

                      <button
                        onClick={() => addCart(item)}
                        className="w-full py-2 text-sm font-semibold rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      >
                        Add to Cart
                      </button>
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
