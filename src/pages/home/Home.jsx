import React, { useContext } from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import ProductApi from "../../api/ProductApi";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";

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

  return (
    <>
      <HeroSection />
      <Filter />
      <ProductCard />
      {/* <ProductApi /> */}
      <Track />
      <Testimonial />
    </>
  );
}

export default Home;
