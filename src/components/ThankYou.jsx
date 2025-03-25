import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-lg mx-auto p-30 bg-white shadow-lg rounded-lg mt-8 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h2>
      <p className="text-lg text-gray-700">Your order is on the way! 🚀</p>
      <img
        src="https://cdn.dribbble.com/users/1537484/screenshots/5910484/check_animation.gif"
        alt="Order Confirmed"
        className="w-48 mx-auto my-6"
      />
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Go to Home
      </button>
    </section>
  );
};

export default ThankYou;
