

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center flex justify-center items-center">
        <FaShoppingCart className="mr-2 text-orange-500" /> Your Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty 😞</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map(({ id, name, price, imageUrl, quantity }) => (
              <div key={id} className="flex items-center justify-between border-b pb-4 transition hover:shadow-md p-3 rounded-md">
                <div className="flex items-center space-x-4">
                  {imageUrl && <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-lg shadow-md" />}
                  <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-700 font-semibold">₹{(price * quantity).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => dispatch(decreaseQuantity(id))}
                    className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition"
                  >
                    <FaMinus />
                  </button>

                  <span className="text-lg font-bold">{quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQuantity(id))}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                  >
                    <FaPlus />
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(id))}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

       
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</h3>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
