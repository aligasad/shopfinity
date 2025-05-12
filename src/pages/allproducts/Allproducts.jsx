import { useEffect } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../context/data/MyState";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import Filter from "../../components/filter/Filter";

function Allproducts() {
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

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

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
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <section className="text-gray-600 body-font">
      <Filter />
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div class="h-1 w-20 bg-yellow-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter((obj) => obj.title.toLowerCase().includes(searchkey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .filter((obj) => obj.price.trim().includes(filterPrice))
            .map((item, index) => {
              const { title, price, category, imageUrl, id } = item;
              return (
                <div
                  key={index}
                  className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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
                        className="h-48 object-contain transition-transform rounded-md duration-300 
                        hover:scale-110 md:hover:scale-135 cursor-pointer"
                        src={imageUrl}
                        alt={title}
                      />
                    </div>
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{category}</p>
                      <h2
                        className="text-sm font-semibold text-gray-800 truncate"
                        style={{ color: mode === "dark" ? "#FFD814" : "" }}
                      >
                        {title}
                      </h2>
                      <div className="flex items-baseline gap-1">
                        <p className="text-base font-bold text-red-600 mt-1">
                         ₹{calcOffer(Number(price))}
                        </p>
                        <p className="text-[0.92rem] font-semibold text-amber-600  line-through">₹{price}</p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addCart(item);
                        }}
                        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2 rounded shadow-sm cursor-pointer"
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

export default Allproducts;
