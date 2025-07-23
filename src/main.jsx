import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
// import App from "./App";
import SignUpPage from "./pages/signup";

import CategoryPage from "./pages/category";

import BookingForm from "./components/booking-form";

import SpaceForm from "./components/SpaceForm";
import { SpacesPage } from "./pages/SpacesPage";
import HomePage from "./pages/Home";
import BookingsPage from "./pages/BookingPage";
import { Toaster } from "react-hot-toast";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },

  {
    path: "/booking-form",
    element: <BookingForm />,
  },

  {
    path: "/SpaceForm",
    element: <SpaceForm />,
  },
  {
    path: "/SpacesPage",
    element: <SpacesPage />,
  },
  {
    path: "/BookingPage",
    element: <BookingsPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" />
    <RouterProvider router={routes} />
  </StrictMode>
);
