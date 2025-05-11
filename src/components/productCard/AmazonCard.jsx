import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function ProductCard() {
  const context = useContext(myContext);
  const { mode } = context;

  const cardStyle = {
    backgroundColor: mode === 'dark' ? '#2e3137' : '#fff',
    color: mode === 'dark' ? 'white' : '#111',
    borderColor: mode === 'dark' ? '#444' : '#ddd',
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2"
            style={{ color: mode === 'dark' ? 'white' : '#111' }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded" />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({length: 4}).map((_, index) => (
            <div
              key={index}
              className="border rounded-md overflow-hidden hover:shadow-md transition duration-300"
              style={cardStyle}
            >
              <div className="cursor-pointer p-4">
                <img
                  src="https://dummyimage.com/720x400"
                  alt="product"
                  className="object-contain w-full  "
                />
              </div>
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-500 mb-1" style={{ color: mode === 'dark' ? '#ccc' : '#555' }}>
                  Brand: E-Bharat
                </p>
                <h2 className="font-medium text-base mb-2">This is title</h2>
                <p className="text-lg font-semibold text-pink-600 mb-2">₹ 500</p>
                <button className="w-full py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
