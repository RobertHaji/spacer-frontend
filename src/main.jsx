import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
// import App from "./App";
import SignUpPage from "./pages/signup";

import CategoryPage from "./pages/category";
import BookingForm from "./components/booking-form";
import CartegoryForm from "./components/category-form";
import SpaceForm from "./components/SpaceForm";
import { SpacesPage } from "./pages/SpacesPage";
import HomePage from "./pages/Home";
import BookingsPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from "react-hot-toast";
import PaymentForm from "./pages/paymentFormPage";
import EditCategoryForm from "./components/EditCategoryForm";
import SpaceDetails from "./pages/SpaceDetails";
import ResultPage from "./pages/ResultPage";
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
    path: "/spaceForm",
    element: <SpaceForm />,
  },
  {
    path: "/spacesPage",
    element: <SpacesPage />,
  },
  {
    path: "/bookingPage",
    element: <BookingsPage />,
  },
  {
    path: "/category",
    element: <CategoryPage />,
  },
  {
    path: "/payment/:bookingId",
    element: <PaymentForm />,
  },
  {
    path: "/adminPage",
    element: <AdminPage />,
  },
  {
    path: "/category-form",
    element: <CartegoryForm />,
  },
  {
    path: "/category/edit/:id",
    element: <EditCategoryForm />,
  },
  {
    path: "/SpaceDetails",
    element: <SpaceDetails />,
  },
  {
    path: "/Results",
    element: <ResultPage />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-right" />
    <RouterProvider router={routes} />
  </StrictMode>
);
