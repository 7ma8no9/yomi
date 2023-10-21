import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import layoutRoute from "./routes/layout.tsx";
import notfoundRoute from "./routes/notfound.tsx";
import SuspenseFallback from "@components/SuspenseFallback";

const router = createBrowserRouter([
  layoutRoute,
  notfoundRoute,
])

const Router: React.FC = () => {
  return (
    <RouterProvider router={router} fallbackElement={<SuspenseFallback />} />
  )
}

export default Router
