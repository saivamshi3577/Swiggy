import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(clearCart()); 
    navigate("/thank-you"); 
  };

  return (
    <section className="max-w-lg mx-auto p-30 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout 🛍️</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={userDetails.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Submit Order
        </button>
      </form>
    </section>
  );
};

export default Checkout;
