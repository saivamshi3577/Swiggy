import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./utils/store"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./App"; 
import BodySection from "./components/BodySection";
import CategoryPage from "./components/CategoryPage";
import './index.css'
import MenuPage from "./components/MenuPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <BodySection /> },
      { path: "/category/:collectionId/:text", element:<CategoryPage />},
      { path: "/category/:collectionId/:text/:id", element:<MenuPage />},
      
      { path: "/cart", element:<Cart/>},
      { path: "/checkout", element:<Checkout/>},
      { path: "/thank-you", element:<ThankYou/>},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
