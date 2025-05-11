import { useEffect, useState } from "react";
import axios from "axios";

const ProductApi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAmazonData = async (page) => {
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: {
        query: "Cloths",
        page: page.toString(),
        country: "US",
        sort_by: "RELEVANCE",
        product_condition: "ALL",
        is_prime: "false",
        deals_and_discounts: "NONE",
      },
      headers: {
        "x-rapidapi-key": "d24a87a224msh65990e2f1eda007p111dadjsnb6df54d6aa27",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      console.log("API response:", response.data.data.products);
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Error fetching Amazon data:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmazonData(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  function trimContent(title, length) {
    return title.length > length
      ? title
          .split(" ")
          .slice(0, length - 1)
          .join(" ") + "..."
      : title;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Amazon Products - Page {currentPage}
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div key={index} className="border rounded p-4 shadow">
                <img
                  src={product.product_photo}
                  alt={product.product_title}
                  className="w-full h-48 object-contain mb-2"
                />
                <h2 className="text-md font-semibold">
                  {trimContent(product.product_title, 8)}
                </h2>
                <p className="text-pink-600 font-bold">
                  {product.product_price}
                </p>
                <a
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on Amazon
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({length: 10}).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-pink-500 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductApi;
