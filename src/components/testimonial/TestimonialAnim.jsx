// TestimonialAnim.jsx
"use client";
import React, { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion"; // Make sure to install framer-motion

import asadDp from "../../assets/react.svg";
import { useData } from "../../context/data/MyState";

const TestimonialAnim = ({ autoplay = false }) => {
  const context = useData();
  const { mode } = context;
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      name: "Asad Alam",
      designation: "Frontend Developer at CodeCraft",
      quote:
        "Using this platform improved our workflow tremendously. The animations are smooth and the interface is super intuitive.",
      src: "https://www.corporatephotographerslondon.com/wp-content/uploads/2023/02/LinkedIn_Profile_Photo.jpg",
    },
    {
      name: "Aisha Khan",
      designation: "Frontend Developer at CodeCraft",
      quote:
        "Using this platform improved our workflow tremendously. The animations are smooth and the interface is super intuitive.",
      src: "https://images.pexels.com/photos/27665348/pexels-photo-27665348/free-photo-of-a-little-girl-that-is-looking-down-at-her-cell-phone.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Ravi Verma",
      designation: "Product Designer at Creatix",
      quote:
        "I love the simplicity and flexibility. It feels like magic every time the UI updates with such elegance.",
      src: "https://www.over40datingsite.co.uk/wp-content/uploads/2016/09/shutterstock_341919467.jpg",
    },
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-8 sm:py-15 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-5 sm:gap-20 md:grid-cols-2">
        {/* Image */}
        <div>
          <div className="relative mx-auto h-50 w-50 sm:h-80 sm:w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className=" h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3
              className="text-2xl font-bold text-gray-700"
              style={{ color: mode === "dark" ? "#FFD814" : "" }}
            >
              {testimonials[active].name}
            </h3>
            <p
              className="text-sm text-amber-500"
              style={{ color: mode === "dark" ? "#FFF8DC" : "" }}
            >
              {testimonials[active].designation}
            </p>
            <motion.p
              className="mt-2 sm:mt-8 text-lg "
              style={{ color: mode === "dark" ? "#D3D3D3" : "" }}
            >
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Arrows */}
          <div
            className="flex gap-4 pt-6 sm:pt-12 md:pt-0"
            
          >
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800"
              style={
                {  backgroundColor: mode === "dark" ? "white" : "" }
              }
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" style={{color: mode === "dark" ? "black" : ""}} />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
              style={{  backgroundColor: mode === "dark" ? "white" : "" }}
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" style={{color: mode === "dark" ? "black" : ""}} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAnim;
