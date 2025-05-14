import React, { useContext, useEffect } from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import ProductApi from "../../api/ProductApi";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { motion } from "framer-motion";

function Home() {
  const { resetFilter } = useData();
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // move to center
        exit={{ opacity: 0 }} // exit off-screen to the right
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      <Filter />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <ProductCard />
      </motion.div>

      {/* <ProductApi /> */}
      <div className="flex justify-center md:-mt-10 mb-4 ">
        <Link to={"/allproducts"}>
          <button
            onClick={resetFilter}
            className=" bg-gray-300 px-5 py-2 rounded-xl cursor-pointer"
          >
            See more
          </button>
        </Link>
      </div>

      <Track />
      <Testimonial />
    </>
  );
}

export default Home;
