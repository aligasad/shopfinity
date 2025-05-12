import { useData } from "../../context/data/MyState";
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
    product,
  } = context;

  function resetFilter() {
    setSearchkey("");
    setFilterPrice("");
    setFilterType("");
  }

  return (

    <div>
  <div className="container mx-auto px-4 mt-5 md:hidden">
    <div
      className="p-5 rounded-lg drop-shadow-xl border"
      style={{
        backgroundColor: mode === "dark" ? "#232F3E" : "#f3f4f6",
        color: mode === "dark" ? "#ffffff" : "#111",
        borderColor: mode === "dark" ? "#37475A" : "#d1d5db",
      }}
    >
      <div className="relative">
        <div className="absolute flex items-center ml-2 h-full text-gray-500">
          <FiSearch />
        </div>
        <input
          type="text"
          name="searchkey"
          id="searchkey"
          value={searchkey}
          onChange={(e) => setSearchkey(e.target.value)}
          placeholder="Search for products"
          className="px-10 py-3 w-full rounded-md border outline-none text-sm transition-all duration-300"
          style={{
            backgroundColor: mode === "dark" ? "#37475A" : "#ffffff",
            color: mode === "dark" ? "#ffffff" : "#111",
            border: mode === "dark" ? "1px solid #485769" : "1px solid #FF9900",
          }}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold text-sm">Filters</p>
        <button 
        onClick={resetFilter}
          className="px-4 py-2 bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
        >
          Reset Filter
        </button>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-white border text-sm outline-none transition focus:ring-2 focus:ring-[#FF9900]"
            style={{
              backgroundColor: mode === "dark" ? "#37475A" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#111",
            }}
          >
            <option value="">All</option>
            {[...new Set(product.map((item) => item.category))].map(
              (item, idx) => (
                <option
                  key={idx}
                  value={item.replace(/\s+/g, "").toLowerCase()}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-white border text-sm outline-none transition focus:ring-2 focus:ring-[#FF9900]"
            style={{
              backgroundColor: mode === "dark" ? "#37475A" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#111",
            }}
          >
            <option value="">All</option>
            {[...new Set(product.map((item) => item.price))].map(
              (item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Filter;
