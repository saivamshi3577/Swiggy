import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRestaurants = createAsyncThunk("api/fetchRestaurants", async () => {
  const response = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4564737&lng=78.3763512&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  const data = await response.json();

  const imageGridData = data?.data?.cards?.find(
    (card) => card?.card?.card?.imageGridCards?.info
  )?.card?.card?.imageGridCards?.info || [];

  const foodItems = imageGridData.map(({ id, imageId }) => ({
    id,
    imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${imageId}`,
  }));

  const restaurantData = data?.data?.cards?.find(
    (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
  )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  const restaurants = restaurantData.map(({ info }) => ({
    id: info.id,
    name: info.name,
    imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`,
    rating: info.avgRating,
    deliveryTime: info.sla.slaString,
    cuisines: info.cuisines.join(", "),
    area: info.areaName,
  }));

  return { foodItems, restaurants };
});


const apiSlice = createSlice({
  name: "api",
  initialState: {
    foodItems: [],
    restaurants: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.foodItems = action.payload.foodItems;
        state.restaurants = action.payload.restaurants;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
