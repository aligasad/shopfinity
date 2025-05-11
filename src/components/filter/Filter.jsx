import { useContext } from "react";
import { useData } from "../../context/data/myState";
import { FiSearch } from "react-icons/fi";

function Filter() {
  const context = useData();
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product
  } = context;

  return (
    <div>
      <div className=" container mx-auto px-4 mt-5 ">
        <div
          className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <FiSearch />
            </div>
            <input
              type="text"
              name="searchkey"
              id="searchkey"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              placeholder="Search here"
              className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
            <button
              className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Reset Filter
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <option value="jacket">Jacket</option>
                {product.map((item, index) => {
                    // console.log("CHECK OPTIONS",item.category.replace(/\s+/g, '').toLowerCase());
                    return(
                        <option key={index} value={item.category}>{item.category}</option>
                    )
                })}
              </select>
              <select
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
