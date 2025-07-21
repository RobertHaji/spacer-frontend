import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
// import App from "./App";
import SignUpPage from "./pages/signup";
 

import BookingForm from "./components/booking-form";

import SpaceForm from "./components/SpaceForm";
import { SpacesPage } from "./pages/SpacesPage";
import HomePage from "./pages/Home";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
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
    element: <SpaceForm/>
  },
  {
    path: "/SpacesPage",
    element: <SpacesPage/>
  }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
