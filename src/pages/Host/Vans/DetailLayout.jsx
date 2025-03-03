import React from "react";
import { Link, Outlet, NavLink, useLoaderData, Await, defer, Navigate } from "react-router-dom";
import { getVan } from "../../../api";
import { requireAuth } from "../../../auth/utils";

export async function loader({ request, params }) {
  const authRedirect = requireAuth({ request });
  if (authRedirect) {
    return { redirectTo: authRedirect };
  }
  return defer({ vans: getVan(params.id) })
}

export default function Detailayout() {
  const promiseData = useLoaderData()

  // Handle auth redirect
  if (promiseData.redirectTo) {
    return <Navigate to={promiseData.redirectTo} replace />
  }

  const activeStyle = {
    fontWeight: "bold",
    color: "red",
    textDecoration: "underline"

  }
  function hostVanDetailViewer(hostVan) {
    return (
      hostVan ? (
        <>
          <div className="container">
            <img src={hostVan.imageUrl} alt={`${hostVan.type} van`} />
            <div className="brief-info">
              <i className={`van-type ${hostVan.type} selected element`}>{hostVan.type}</i>
              <h2 className="element">{hostVan.name}</h2>
              <h3 className="element">${hostVan.price} /day</h3>
            </div>
          </div>

          <nav className="host-nav-bar nested-bar">
            <NavLink to="." end style={({ isActive }) => isActive ? activeStyle : null}>Details</NavLink>
            <NavLink to="pricing" style={({ isActive }) => isActive ? activeStyle : null}>Pricing</NavLink>
            <NavLink to="photos" style={({ isActive }) => isActive ? activeStyle : null}>Photos</NavLink>
          </nav>
          <Outlet context={hostVan} />
        </>
      ) : (
        <h1>It is not available</h1>
      )
    );

  }
  return (
    <div className="main-container">
      <Link to=".." relative="path"
        className="back-link"
        preventScrollReset>← Back to main list</Link>

      <React.Suspense fallback={<h3>Loading van details...</h3>}>
        <Await resolve={promiseData.vans}>
          {hostVanDetailViewer}
        </Await></React.Suspense>
    </div>)
}