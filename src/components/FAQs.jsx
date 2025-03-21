import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqsData = [
  {
    question: "What is Swiggy?",
    answer: "Swiggy is India's largest online food ordering and delivery platform. It connects users with nearby restaurants for quick food delivery."
  },
  {
    question: "How do I place an order?",
    answer: "Simply log in, choose your favorite restaurant, add items to the cart, and proceed to checkout. You can pay online or choose cash on delivery."
  },
  {
    question: "What are the delivery charges?",
    answer: "Delivery charges depend on the distance and restaurant policies. Some restaurants offer free delivery on orders above a certain amount."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order in real-time from the Swiggy app or website under the 'My Orders' section."
  },
  {
    question: "What is Swiggy Super?",
    answer: "Swiggy Super is a membership program that provides free deliveries and exclusive discounts for members."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white p-6 md:p-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
   
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-700" />
              ) : (
                <FaChevronDown className="text-gray-700" />
              )}
            </button>

        
            <div
              className={`overflow-hidden transition-max-height duration-300 ${
                openIndex === index ? "max-h-40 p-4" : "max-h-0 p-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
