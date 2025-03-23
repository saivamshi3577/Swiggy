
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../utils/apiSlice";

const OnlineRestaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, status } = useSelector((state) => state.api);
  const searchQuery = useSelector((state) => state.search.query);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [status, dispatch]);


  const filteredRestaurants = restaurants.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredRestaurants.length === 0) return null;

  return (
    <section className="bg-white pl-30 pr-30">
      <h2 className="text-2xl font-bold mb-4">Restaurants with online food delivery in Hyderabad</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, area }) => (
          <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={imageUrl} alt={name} className="w-full h-44 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-green-600 flex items-center mt-1">
                <FaStar className="mr-1 text-yellow-500" /> {rating} • {deliveryTime}
              </p>
              <p className="text-gray-600 text-sm">{cuisines}</p>
              <p className="text-gray-500 text-xs">{area}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnlineRestaurants;
