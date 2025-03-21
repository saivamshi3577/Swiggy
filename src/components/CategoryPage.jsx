import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Shimmer from "./Shimmer";

const CategoryPage = () => {
  const { categoryId } = useParams(); 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4564737&lng=78.3763512&collection_id=${categoryId}&page_type=DESKTOP_WEB_LISTING`
        );
        const data = await response.json();


        const restaurantData = data?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        const formattedRestaurants = restaurantData.map(({ info }) => ({
          id: info.id,
          name: info.name,
          imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`,
          rating: info.avgRating,
          deliveryTime: info.sla.slaString,
          cuisines: info.cuisines.join(", "),
          area: info.areaName,
        }));

        setRestaurants(formattedRestaurants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]); 

  return (
    <section className="bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Restaurants for {categoryId}</h2>

      {loading && <Shimmer count={8} />}

     
      {!loading && restaurants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, area }) => (
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
      )}

      {!loading && restaurants.length === 0 && (
        <p className="text-gray-500 text-center">No restaurants found for this category.</p>
      )}
    </section>
  );
};

export default CategoryPage;
