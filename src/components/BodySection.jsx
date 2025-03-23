import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../utils/apiSlice";
import { setSearchQuery, setFilteredResults } from "../utils/searchSlice";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import OnlineRestaurants from "./OnlineRestaurants";
import FAQs from "./FAQs";
import Shimmer from "./Shimmer";

const BodySection = () => {
  const dispatch = useDispatch();
  const { foodItems, collections, restaurants, status } = useSelector((state) => state.api);
  const { filteredResults } = useSelector((state) => state.search);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchText.trim() === "") {
      dispatch(setFilteredResults([]));
    } else {
      const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredFoodItems = foodItems.filter((item) =>
        item.imageUrl.toLowerCase().includes(searchText.toLowerCase())
      );

      dispatch(setFilteredResults([...filteredRestaurants, ...filteredFoodItems]));
    }
  }, [searchText, restaurants, foodItems, dispatch]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 lg:px-16">
   
      <div className="flex justify-center pt-30 pb-20 ">
        <input
          type="text"
          placeholder="Search restaurants or food..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-all">
          <FaSearch />
        </button>
      </div>

      <section className="bg-white pb-10">
        {status === "loading" && <Shimmer count={6} />}

        {searchText.trim() !== "" && filteredResults.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredResults.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, area }) => (
                <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
                  <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-lg" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    {rating && (
                      <p className="text-sm text-gray-500 flex items-center">
                        ⭐ {rating} • {deliveryTime}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">{cuisines}</p>
                    <p className="text-sm text-gray-500">{area}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {status === "succeeded" && foodItems.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">Virat, what's on your mind?</h2>
                <Swiper
                  spaceBetween={10}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                  }}
                  className="pb-6 w-full"
                >
                  {foodItems.map(({ id, imageUrl }, index) => {
                    const collection = collections[index];
                    if (!collection) return null;

                    return (
                      <SwiperSlide key={id} className="flex justify-center">
                        <Link to={`/category/${collection.collectionId}/${encodeURIComponent(collection.text)}`}>
                          <img
                            src={imageUrl}
                            alt="Food Item"
                            className="w-30 h-40 sm:w-28 sm:h-38 md:w-36 md:h-46 lg:w-38 lg:h-48 xl:w-40 xl:h-50 object-cover transition-transform duration-300 hover:scale-110 "
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            )}

            {status === "succeeded" && restaurants.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-6 text-center">Top restaurant chains in Hyderabad</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {restaurants.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, area }) => (
                    <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
                      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-lg" />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          ⭐ {rating} • {deliveryTime}
                        </p>
                        <p className="text-sm text-gray-600">{cuisines}</p>
                        <p className="text-sm text-gray-500">{area}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      <OnlineRestaurants />
      <FAQs />
    </div>
  );
};

export default BodySection;
