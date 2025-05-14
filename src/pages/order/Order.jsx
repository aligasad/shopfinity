import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useData } from "../../context/data/MyState";
import NoOrderFound from "../../components/noorder/NoOrderFound";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useData();
  const { mode, loading, order, calcOffer } = context;

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

    <div
      className="h-full lg:h-screen bg-gray-100 pt-5 "
      style={{
        backgroundColor: mode === "dark" ? "#282c34" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="mb-10 text-center text-2xl font-bold">Orders</h1>
      <div className="mx-auto max-w-[100%] justify-center px-2 md:flex  xl:px-0 ">
        <div className="rounded-lg max-h-[80vh] overflow-y-auto ">
          {loading && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full pt-10">
            {order
              .filter((obj) => obj.userid == userid)
              .map((order) => {
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {order.cartItems.map((item) => {
                      return (
                        <div className="rounded-lg md:w-2/3">
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-xl font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.title}
                                </h2>
                                <h2
                                  className="text-base font-semibold text-gray-600"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.category}
                                </h2>

                                <p
                                  className="mt-1 text-sm text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  <div className="flex items-baseline gap-3">
                                    <p className="text-base font-bold text-red-600 mt-1">
                                      ₹{calcOffer(Number(item.price))}
                                    </p>
                                    <p className="text-sm font-semibold text-amber-600  line-through">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <NoOrderFound />
      )}
        </div>

        
      </div>
    </div>

      
    </>
  );
}

export default Order;
