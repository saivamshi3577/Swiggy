

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import Shimmer from "./Shimmer";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const MenuPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null); 

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4564737&lng=78.3763512&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
        );
        const data = await response.json();

        // Extract restaurant details
        const restaurantInfo = data?.data?.cards?.find((card) => card?.card?.card?.info)?.card?.card?.info || {};

 
        const menuCategories =
          data?.data?.cards
            ?.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.map(({ card }) => card?.card)
            ?.filter((card) => card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
            ?.map(({ title, itemCards }) => ({
              title,
              items: itemCards.map(({ card }) => ({
                id: card.info.id,
                name: card.info.name,
                description: card.info.description,
                price: card.info.price / 100 || 0,
                rating: card.info.ratings?.aggregatedRating?.rating || "N/A",
                ratingCount: card.info.ratings?.aggregatedRating?.ratingCountV2 || "0",
                isVeg: card.info.itemAttribute?.vegClassifier === "VEG",
                imageUrl: card.info.imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_256,h_256/${card.info.imageId}`
                  : null,
                offer: card.info.offerTags?.[0]?.title || null,
                offerDetails: card.info.offerTags?.[0]?.subTitle || null,
              })),
            })) || [];

        setRestaurant(restaurantInfo);
        setMenu(menuCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [id]);

  return (
    <section className="bg-white p-30">
      {loading && <Shimmer count={6} />}

      {!loading && restaurant && (
        <>
          <div className="relative bg-gradient-to-r from-red-500 to-orange-400 text-white p-6 rounded-lg shadow-xl transition-all duration-300">
            <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-300 mr-1" />
              <p className="text-lg">{restaurant.avgRating} ({restaurant.totalRatingsString})</p>
              <span className="mx-2 text-gray-300">•</span>
              <p className="text-lg font-medium">₹{restaurant.costForTwoMessage}</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-yellow-200">{restaurant.cuisines?.join(", ")}</p>
            <div className="flex items-center mt-3">
              <FaMapMarkerAlt className="text-white mr-2" />
              <p className="text-md">{restaurant.areaName}</p>
            </div>
            <div className="flex items-center mt-2">
              <FaClock className="text-white mr-2" />
              <p className="text-md">{restaurant.sla?.slaString}</p>
            </div>
          </div>

          {restaurant.feeDetails?.message && (
            <div className="bg-red-100 text-red-600 p-3 mt-4 rounded-lg shadow-md text-center font-semibold">
              {restaurant.feeDetails.message}
            </div>
          )}

          {menu.map(({ title, items }, index) => (
            <div key={title} className="mt-6 border-b pb-4">
              <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all duration-200"
                onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
              >
                <h2 className="text-xl font-bold">{title} ({items.length})</h2>
                <span className="text-lg">{expandedCategory === index ? "▲" : "▼"}</span>
              </div>

              {expandedCategory === index && (
                <div className="mt-4 space-y-4">
                  {items.map(({ id, name, description, price, rating, ratingCount, isVeg, imageUrl, offer, offerDetails }) => (
                    <div key={id} className="flex items-center justify-between border-b pb-3 transition-all duration-200 hover:shadow-md p-3 rounded-md">
                      <div className="w-3/4">
                        <div className="flex items-center">
                          <span className={`w-4 h-4 mr-2 ${isVeg ? "bg-green-500" : "bg-red-500"} rounded-full`} />
                          <h3 className="text-lg font-semibold">{name}</h3>
                        </div>
                        <p className="text-gray-700 font-semibold">₹{price}</p>
                        {offer && (
                          <p className="text-sm text-red-500 bg-red-100 px-2 py-1 inline-block rounded-md">
                            {offer} - {offerDetails}
                          </p>
                        )}
                        {rating !== "N/A" && (
                          <p className="text-sm text-gray-700 flex items-center">
                            <FaStar className="text-yellow-500 mr-1" /> {rating} ({ratingCount})
                          </p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">{description}</p>
                      </div>

                      <div className="w-1/4 flex flex-col items-center">
                        {imageUrl && <img src={imageUrl} alt={name} className="w-20 h-20 rounded-lg object-cover" />}
                        <button
                          onClick={() => dispatch(addToCart({ id, name, price, imageUrl, quantity: 1 }))}
                          className="bg-green-500 text-white px-4 py-1 mt-2 rounded-md shadow-md hover:bg-green-600 transition-all duration-200"
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default MenuPage;
