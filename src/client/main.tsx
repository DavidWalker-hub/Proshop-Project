import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeScreen } from "./routes/HomeScreen";
import { Root } from "./routes/Root";
import { ProductScreen, productLoader } from "./routes/ProductScreen";

import React from "react";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Root />,
  //   children: [
  //     {
  //       index: true,
  //       element: <HomeScreen />,
  //     },
  //     {
  //       path: "product/:productId",
  //       element: <ProductScreen />,
  //       loader: productLoader,
  //     },
  //   ],
  // },
  {
    path: "*",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
