import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login";
import App from "./App";
import SignUpPage from "./pages/signup";
import Home from "./pages/Home"
import SpaceForm from "./components/SpaceForm";
import { SpacesPage } from "./pages/SpacesPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
