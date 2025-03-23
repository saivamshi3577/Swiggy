import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchRestaurants = createAsyncThunk("api/fetchRestaurants", async () => {
  const response = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4564737&lng=78.3763512&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );
  const { data } = await response.json();

  const foodItems =
    data?.cards?.find(({ card }) => card?.card?.imageGridCards?.info)?.card?.card?.imageGridCards?.info.map(
      ({ id, imageId }) => ({
        id,
        imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${imageId}`,
      })
    ) || [];

  const restaurants =
    data?.cards?.find(({ card }) => card?.card?.gridElements?.infoWithStyle?.restaurants)?.card?.card
      ?.gridElements?.infoWithStyle?.restaurants.map(({ info }) => ({
        id: info?.id,
        name: info?.name,
        imageUrl: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info?.cloudinaryImageId}`,
        rating: info?.avgRating,
        deliveryTime: info?.sla?.slaString,
        cuisines: info?.cuisines?.join(", "),
        area: info?.areaName,
      })) || [];


  const collections =
    data?.cards
      ?.flatMap(({ card }) => card?.card?.imageGridCards?.info || []) 
      ?.map(({ entityId, action }) => {
        const collectionMatch = entityId.match(/collection_id=(\d+)/);
        return {
          collectionId: collectionMatch ? collectionMatch[1] : "",
          text: action?.text || "", 
        };
      })
      ?.filter(({ collectionId }) => collectionId) || []; 

  return { foodItems, restaurants, collections };
});

const apiSlice = createSlice({
  name: "api",
  initialState: {
    foodItems: [],
    restaurants: [],
    collections: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.foodItems = payload.foodItems;
        state.restaurants = payload.restaurants;
        state.collections = payload.collections;
      })
      .addCase(fetchRestaurants.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      });
  },
});

export default apiSlice.reducer;
