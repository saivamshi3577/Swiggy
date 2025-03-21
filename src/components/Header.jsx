import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../utils/searchSlice";
import { FaSearch, FaTimes, FaPercentage, FaQuestionCircle, FaShoppingBag } from "react-icons/fa";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    dispatch(setSearchQuery(e.target.value)); 
  };

  return (
    <header className="bg-white shadow-md py-3 px-6 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 ease-in-out">
    
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy64EnBGu2_EiL2l7_QFkbmjE5QaQ96-CGanZH_t11TifdJbDPKv3JHsLOf9tiviRYcTY&usqp=CAU"
            alt="Logo"
            className="w-30 h-20"
          />
        </div>


        {showSearch && (
          <button
            onClick={() => setShowSearch(false)}
            className="md:hidden text-gray-500 hover:text-black text-xl"
          >
            <FaTimes />
          </button>
        )}
      </div>


      <div
        className={`w-full flex items-center justify-center mt-3 md:mt-0 transition-all duration-500 ease-in-out ${
          showSearch ? "block" : "hidden md:flex"
        }`}
      >
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={handleSearch}
          className="px-4 py-2 w-80 border border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <button className="bg-orange-500 text-white px-5 py-3.5 rounded-r-md hover:bg-orange-600 transition-all">
          <FaSearch />
        </button>
      </div>


      <nav
        className={`flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-700 transition-all duration-500 ease-in-out ${
          showSearch ? "hidden" : "block"
        }`}
      >
        <a href="#" className="hover:text-black font-semibold">
          Swiggy
        </a>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center space-x-1 hover:text-black"
        >
          <FaSearch />
          <span>Search</span>
        </button>
        <a href="#" className="flex items-center space-x-1 hover:text-black">
          <FaPercentage />
          <span>
            Offers <sup className="text-orange-500 font-bold">NEW</sup>
          </span>
        </a>
        <a href="#" className="flex items-center space-x-1 hover:text-black">
          <FaQuestionCircle />
          <span>Help</span>
        </a>
      </nav>

      {/* Cart */}
      <div
        className={`flex items-center space-x-4 transition-all duration-500 ease-in-out ${
          showSearch ? "hidden" : "block"
        }`}
      >
        <a href="#" className="flex items-center space-x-1 hover:text-black">
          <FaShoppingBag />
          <span>Cart</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
