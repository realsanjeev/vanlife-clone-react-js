import React from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Components/Layout";
import ErrorComponent from "./Components/ErrorComponent";
import NotFound from "./Components/NotFound";

import Home from "./pages/Home";
import About from "./pages/About";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import Van, { loader as vanLoader } from "./pages/Vans/Van";
import Income from "./pages/Host/Income";
import Review from "./pages/Host/Review";
import HostLayout from "./pages/Host/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/Host/Vans/HostVans";

import Detailayout, {
  loader as hostVanLoader,
} from "./pages/Host/Vans/DetailLayout";
import Details from "./pages/Host/Vans/Details";
import Photos from "./pages/Host/Vans/Photos";
import Pricing from "./pages/Host/Vans/Pricing";

import "./styles.css";

// import { requireAuth } from "./auth/utils";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="host" element={<HostLayout />}>
          <Route
            index
            element={<Dashboard />}
            loader={dashboardLoader}
          />
          <Route
            path="income"
            element={<Income />}
          />
          <Route
            path="review"
            element={<Review />}
          />
          <Route path="vans" element={<HostVans />} loader={hostVansLoader} />

          <Route
            path="vans/:id"
            element={<Detailayout />}
            loader={hostVanLoader}
          >
            <Route
              index
              element={<Details />}
            />
            <Route
              path="pricing"
              element={<Pricing />}
            />
            <Route
              path="photos"
              element={<Photos />}
            />
          </Route>
        </Route>
        <Route path="about" element={<About />} />
        <Route
          path="vans"
          element={<Vans />}
          loader={vansLoader}
          errorElement={<ErrorComponent />}
        />
        <Route path="vans/:id" element={<Van />} loader={vanLoader} />

        <Route
          path="login"
          element={<Login />}
          loader={loginLoader}
          action={loginAction}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
