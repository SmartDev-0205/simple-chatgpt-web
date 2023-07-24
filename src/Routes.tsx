import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Blank from "./pages/Blank";

// ----------------------------------------------------------------------------------

const LandingLayout = lazy(() => import("./layouts"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function Routes() {
  return useRoutes([
    {
      element: <LandingLayout />,
      path: "/",
      children: [
        {
          path: "gpt",
          element: <Dashboard />,
        },
        {
          path: "404",
          element: <Blank />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
        {
          path: "/",
          element: <Navigate to="/gpt" replace />,
        },
      ],
    },
  ]);
}
