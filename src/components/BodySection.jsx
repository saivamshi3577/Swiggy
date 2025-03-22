



import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../utils/apiSlice";
import "swiper/css";
import OnlineRestaurants from "./OnlineRestaurants";
import FAQs from "./FAQs";
import Shimmer from "./Shimmer";

const BodySection = () => {
  const dispatch = useDispatch();
  const { foodItems, restaurants, status } = useSelector((state) => state.api);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [status, dispatch]);

  return (
    <>
      <section className="bg-white p-6">
      
        {status === "loading" && <Shimmer count={6} />}

       
        {status === "succeeded" && foodItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Virat, what's on your mind?</h2>
            <Swiper spaceBetween={20} slidesPerView={5} className="pb-6 w-full">
              {foodItems.map(({ id, imageUrl }) => (
                <SwiperSlide key={id} className="flex justify-center">
                  <Link to={`/category/${id}`}>
                    <img
                      src={imageUrl}
                      alt="Food Item"
                      className="w-45 h-45 transition-transform duration-300 hover:scale-110"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

  
        {status === "succeeded" && restaurants.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Top restaurant chains in Hyderabad</h2>
            <Swiper spaceBetween={20} slidesPerView={3} className="pb-6 w-full">
              {restaurants.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, area }) => (
                <SwiperSlide key={id} className="flex flex-col items-start bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-lg" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      ⭐ {rating} • {deliveryTime}
                    </p>
                    <p className="text-sm text-gray-600">{cuisines}</p>
                    <p className="text-sm text-gray-500">{area}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </section>

      <OnlineRestaurants />
      <FAQs />
    </>
  );
};

export default BodySection;
