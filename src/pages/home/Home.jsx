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

function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  console.log(cartItem);

  const addCart = () => {
    dispatch(addToCart("shirt"));
  };

  const deletCart = () => {
    dispatch(deleteFromCart("shirt"));
  };

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    
      <HeroSection />
      <Filter />
      <ProductCard />
      {/* <ProductApi /> */}
      <div className="flex justify-center md:-mt-10 mb-4 ">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      
      <Track />
      <Testimonial />
    </>
  );
}

export default Home;
