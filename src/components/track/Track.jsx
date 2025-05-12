import React, { useContext } from "react";
import { useData } from "../../context/data/MyState";

function Track() {
  const context = useData();
  const { toggleMode, mode } = context;
  return (

    <div>
  <section className="body-font">
    <div className="container px-5 md:py-5 mx-auto">
      <div className="flex flex-wrap -m-4 text-center">
        {[
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            ),
            title: "Premium T-Shirts",
            desc: "Our T-Shirts are 100% made of cotton.",
          },
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            ),
            title: "Free Shipping",
            desc: "We ship all over India for FREE.",
          },
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ),
            title: "Exciting Offers",
            desc: "We provide amazing offers & discounts.",
          },
        ].map((item, index) => (
          <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div
              className="border bg-white hover:shadow-md rounded-lg px-4 py-6 transition-all duration-300 ease-in-out"
              style={{
                borderColor: "#ddd",
                backgroundColor: mode === "dark" ? "#232F3E" : "#fff",
                color: mode === "dark" ? "#fff" : "#111",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#FF9900"
                className="w-12 h-12 mb-3 inline-block"
              >
                {item.icon}
              </svg>
              <h2 className="title-font font-semibold text-lg mb-2" style={{ color: mode === "dark" ? "#f0c14b" : "#111" }}>
                {item.title}
              </h2>
              <p className="leading-relaxed text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>

  );
}

export default Track;
