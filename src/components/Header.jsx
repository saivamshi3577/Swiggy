import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPercentage, FaQuestionCircle, FaShoppingBag } from "react-icons/fa";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-50">

      <Link to="/" className="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy64EnBGu2_EiL2l7_QFkbmjE5QaQ96-CGanZH_t11TifdJbDPKv3JHsLOf9tiviRYcTY&usqp=CAU"
          alt="Logo"
          className="w-24 h-12"
        />
      </Link>

      <nav className="flex items-center space-x-8 font-semibold text-gray-700">
        <Link to="#" className="hover:text-black">Swiggy</Link>
    
        <Link to="#" className="flex items-center space-x-1 hover:text-black">
          <FaPercentage />
          <span>Offers <sup className="text-orange-500 font-bold">NEW</sup></span>
        </Link>
        <Link to="#" className="flex items-center space-x-1 hover:text-black">
          <FaQuestionCircle />
          <span>Help</span>
        </Link>
      </nav>

  
      <div className="relative">
        <Link to="/cart" className="flex items-center space-x-2 hover:text-black">
          <FaShoppingBag />
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
