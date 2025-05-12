import React, { useContext } from "react";
import { useData } from "../../context/data/MyState";

function Testimonial() {
  const context = useData();
  const { mode } = context;
  return (
    // <div>
    //   <section className="text-gray-600 body-font mb-10">
    //     <div className="container px-5 py-10 mx-auto">
    //       <h1
    //         className=" text-center text-3xl font-bold text-black"
    //         style={{ color: mode === "dark" ? "white" : "" }}
    //       >
    //         Testimonial
    //       </h1>
    //       <h2
    //         className=" text-center text-2xl font-semibold mb-10"
    //         style={{ color: mode === "dark" ? "white" : "" }}
    //       >
    //         What our <span className=" text-pink-500">customers</span> are
    //         saying
    //       </h2>
    //       <div className="flex flex-wrap -m-4">
    //         <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
    //           <div className="h-full text-center">
    //             <img
    //               alt="testimonial"
    //               className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
    //               src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png"
    //             />
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="leading-relaxed"
    //             >
    //               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //               Iusto libero, reiciendis alias sapiente eius atque quia
    //               laborum, sit ex laboriosam eveniet ea. Recusandae illum ipsam
    //               consequatur officia saepe, dolorum omnis!
    //             </p>
    //             <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
    //             <h2
    //               style={{ color: mode === "dark" ? "#ff4162" : "" }}
    //               className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
    //             >
    //               Jackline Chupli
    //             </h2>
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="text-gray-500"
    //             >
    //               Senior Product Designer
    //             </p>
    //           </div>
    //         </div>
    //         <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
    //           <div className="h-full text-center">
    //             <img
    //               alt="testimonial"
    //               className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
    //               src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png"
    //             />
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="leading-relaxed"
    //             >
    //               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    //               Itaque, minus. Rerum voluptas hic mollitia asperiores quo,
    //               nemo amet, quam laboriosam voluptatum repellat ipsum sed
    //               beatae. Vitae animi natus ex ipsum?
    //             </p>
    //             <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
    //             <h2
    //               style={{ color: mode === "dark" ? "#ff4162" : "" }}
    //               className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
    //             >
    //               Narandra Gaddi
    //             </h2>
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="text-gray-500"
    //             >
    //               HOD Soa
    //             </p>
    //           </div>
    //         </div>
    //         <div className="lg:w-1/3 lg:mb-0 p-4">
    //           <div className="h-full text-center">
    //             <img
    //               alt="testimonial"
    //               className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
    //               src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png"
    //             />
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="leading-relaxed"
    //             >
    //               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //               Error, minima dignissimos hic laboriosam amet quis voluptas
    //               voluptates iure ducimus tempora placeat sit facere laudantium
    //               sapiente qui possimus ullam necessitatibus ea.
    //             </p>
    //             <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
    //             <h2
    //               style={{ color: mode === "dark" ? "#ff4162" : "" }}
    //               className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
    //             >
    //               Baba Rajwan
    //             </h2>
    //             <p
    //               style={{ color: mode === "dark" ? "white" : "" }}
    //               className="text-gray-500"
    //             >
    //               SanT
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>

    <div>
  <section className="body-font mb-10">
    <div className="container px-5 py-10 mx-auto">
      <h1
        className="text-center text-3xl font-bold"
        style={{ color: mode === "dark" ? "#fff" : "#232F3E" }}
      >
        Customer Reviews
      </h1>
      <h2
        className="text-center text-xl font-medium mb-10"
        style={{ color: mode === "dark" ? "#ddd" : "#555" }}
      >
        What our <span style={{ color: "#FF9900" }}>verified buyers</span> are saying
      </h2>
      <div className="flex flex-wrap -m-4">
        {[ 
          {
            name: "Jackline Chupli",
            role: "Senior Product Designer",
            content:
              "Absolutely love the quality! It feels premium and fits great. Shipping was fast too. Would highly recommend to anyone looking for a solid product.",
          },
          {
            name: "Narendra Gaddi",
            role: "HOD SOA",
            content:
              "Very pleased with the overall shopping experience. Smooth payment process and timely delivery. Will definitely shop again.",
          },
          {
            name: "Baba Rajwan",
            role: "SanT",
            content:
              "Customer support was responsive and helpful. The discounts were genuine and the product met all expectations. Great job!",
          },
        ].map((review, idx) => (
          <div key={idx} className="lg:w-1/3 md:w-1/2 w-full p-4">
            <div
              className="h-full bg-white dark:bg-[#232F3E] p-6 rounded-lg border border-gray-200 dark:border-gray-600 shadow hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">
                <img
                  alt="testimonial"
                  className="w-16 h-16 object-cover rounded-full border border-gray-300 dark:border-gray-500"
                  src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png"
                />
              </div>
              <svg
                className="w-6 h-6 mx-auto mb-4 text-[#FF9900]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.17 6A5.001 5.001 0 002 11v2a1 1 0 001 1h3v4a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1H5v-1a3 3 0 015.83-1H7.17zm10 0A5.001 5.001 0 0012 11v2a1 1 0 001 1h3v4a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-3v-1a3 3 0 015.83-1h-3.83z" />
              </svg>
              <p
                className="leading-relaxed text-sm text-gray-800 dark:text-gray-200"
              >
                {review.content}
              </p>
              <div className="mt-6 text-center">
                <h3
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{ color: "#FF9900" }}
                >
                  {review.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</div>

  );
}

export default Testimonial;
