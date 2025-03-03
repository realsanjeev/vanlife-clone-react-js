import React from "react";
import { Link, useLoaderData, defer, Await, Navigate } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../auth/utils";

export async function loader({ request }) {
  const authRedirect = requireAuth({ request });
  if (authRedirect) {
    return { redirectTo: authRedirect };
  }
  return defer({ vans: getHostVans() })
}

export default function HostVans() {
  const promiseData = useLoaderData();

  // Handle auth redirect
  if (promiseData.redirectTo) {
    return <Navigate to={promiseData.redirectTo} replace />
  }

  function hostVansViewer(hostVan) {
    const vanElements = hostVan.map((van) => (
      <div key={van.id} className="van-tile user-van">
        <Link to={van.id}>
          <img src={van.imageUrl} alt={`${van.type} van`} />
          <div className="user-van-info">
            <h3>{van.name}</h3>
            <p>
              <span>${van.price}</span>
              <span>/day</span>
            </p>
          </div>
        </Link>
      </div>
    ));

    return (
      hostVan.length > 0 ? <div className="user-van-list">{vanElements}</div> : <h3>No listed vans found</h3>
    )
  }


  return (
    <div>
      <h1>Listed vans are displayed here</h1>
      <React.Suspense fallback={<h3>Loading listed vans...</h3>}>
        <Await resolve={promiseData.vans}>
          {hostVansViewer}
        </Await>
      </React.Suspense>
    </div>
  );
}
