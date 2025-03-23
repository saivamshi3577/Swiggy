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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <BodySection /> },
      // { path: "/category/:categoryId", element: <CategoryPage /> },
      { path: "/category/:collectionId/:text", element:<CategoryPage />},
      { path: "/category/:collectionId/:text/:id", element:<MenuPage />},
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
