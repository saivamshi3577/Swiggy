import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar, FaFilter } from "react-icons/fa";
import Shimmer from "./Shimmer";

const CategoryPage = () => {
  const { collectionId, text } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(""); 
  const [onlyFastDelivery, setOnlyFastDelivery] = useState(false); 

  
  useEffect(() => {
    if (!collectionId || !text || collectionId === "undefined" || text === "undefined") {
      navigate("/");
    }
  }, [collectionId, text, navigate]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4564737&lng=78.3763512&collection=${collectionId}&tags=layout_CCS_${text}&sortBy=${sortBy}&filters=${onlyFastDelivery ? "isRestaurantBolt" : ""}&type=rcv2&offset=0&page_type=null`
        );

        const data = await response.json();

        const restaurantData =
          data?.data?.cards
            ?.map(({ card }) => card?.card)
            ?.filter((card) => card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant")
            ?.map(({ info }) => ({
              id: info.id,
              name: info.name,
              imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`,
              rating: info.avgRating,
              deliveryTime: info.sla.slaString,
              costForTwo: info.costForTwoMessage,
              cuisines: info.cuisines.join(", "),
              area: info.areaName,
            })) || [];

        setRestaurants(restaurantData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [collectionId, text, sortBy, onlyFastDelivery]);

  return (
    <section className="bg-white p-30 ">
      <h1 className="text-4xl font-bold">{text}</h1>
      <p className="text-lg text-gray-600">Taste these delectable classics, delectable biryanis to make your day.</p>


      <div className="flex items-center space-x-4 mt-4">
        <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setOnlyFastDelivery(!onlyFastDelivery)}>
          <FaFilter className="mr-2" /> Filter
        </button>

        <select className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="deliveryTimeAsc">Delivery Time</option>
          <option value="modelBasedRatingDesc">Rating</option>
          <option value="costForTwoAsc">Cost: Low to High</option>
          <option value="costForTwoDesc">Cost: High to Low</option>
        </select>

        <button className={`px-4 py-2 border rounded-lg ${onlyFastDelivery ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setOnlyFastDelivery(!onlyFastDelivery)}>
          10 Mins Delivery
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-6">{restaurants.length} Restaurants to explore</h2>

      {loading && <Shimmer count={8} />}

      {!loading && restaurants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {restaurants.map(({ id, name, imageUrl, rating, deliveryTime, cuisines, costForTwo, area }) => (
            <Link key={id} to={`/category/${collectionId}/${text}/${id}`} className="bg-white shadow-lg rounded-lg overflow-hidden block">
              <img src={imageUrl} alt={name} className="w-full h-44 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-green-600 flex items-center mt-1">
                  <FaStar className="mr-1 text-yellow-500" /> {rating} • {deliveryTime}
                </p>
                <p className="text-gray-600 text-sm">{cuisines}</p>
                <p className="text-gray-500 text-xs">{area}</p>
                <p className="text-gray-700 font-semibold">{costForTwo}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && restaurants.length === 0 && <p className="text-gray-500 text-center mt-6">No restaurants found for this category.</p>}
    </section>
  );
};

export default CategoryPage;
