import React, { useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { useData } from "../../../context/data/MyState";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useData();
  const { mode, product, order, users } = context;
  let orderLength = order.length;
  let productLength = product.length;
  let usersLength = users.length;

  // useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [])


  return (
    <section className="text-gray-600 body-font mt-10 mb-10">
      {/* <div className="container px-5 mx-auto mb-10">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                10
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Products
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                10
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Orders
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                20
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Users
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                20
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Products
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container px-5 mx-auto mb-15">
        <div className="flex flex-wrap justify-around -m-4 text-center">
          {[
            { label: "Total Products", value: productLength },
            { label: "Total Orders", value: orderLength },
            { label: "Total Users", value: usersLength },
          ].map((item, idx) => (
            <div key={idx} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md px-6 py-5 rounded-2xl"
                style={{
                  backgroundColor: mode === "dark" ? "#232F3E" : "#fff",
                  borderColor: mode === "dark" ? "#37475A" : "#FF9900",
                  color: mode === "dark" ? "#fff" : "#232F3E",
                }}
              >
                <div
                  className="mx-auto mb-3 flex items-center justify-center rounded-full p-3"
                  style={{
                    backgroundColor: "#FF9900",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <FaUserTie size={32} color="white" />
                </div>
                <h2 className="text-3xl font-extrabold mb-1">{item.value}</h2>
                <p
                  className="font-semibold text-sm tracking-wide"
                  style={{
                    color: mode === "dark" ? "#FFD814" : "#FF9900",
                  }}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DashboardTab />
    </section>
  );
}

export default Dashboard;
