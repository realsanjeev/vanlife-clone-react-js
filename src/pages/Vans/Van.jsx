import React from "react";
import { Link, useLocation, useLoaderData, useParams, Await, defer } from "react-router-dom";
import { getVans } from "../../api";

export async function loader({ params }) {
  return defer({vans: getVans(params.id)})
}
export default function Van() {
  const params = useParams();
  const location = useLocation();
  const promiseData = useLoaderData();
  // can be done by paassing type parameter from link state
  const isFromPreviousRoute = () => {
    if (location.state.search === "") {
      return "all";
    }
    const splitSearch = location.state.search.split("&");
    console.log(splitSearch);

    for (let i = 0; i < splitSearch.length; i++) {
      const filterElement = splitSearch[i];
      if (filterElement.startsWith("type=")) {
        return filterElement.slice(5);
      }
    }
  };
  const historyFilterUsed = location.state?.search
    ? isFromPreviousRoute()
    : "all";

  function VanDetailViewer(van){
    return (
      van ? <div>
      <img src={van.imageUrl} alt={`${van.type} van`} />
      <div className="van-info">
        <h3>{van.name}</h3>
        <p>
          <span>
            <strong>Price: </strong>
          </span>
          ${van.price}
          <span>/day</span>
        </p>
      </div>
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
      <p>{van.description}</p>
      <button className="link-button">Rent this van</button>
      </div> : <h2>Yan with id: {params.id} not found</h2>
    )
  }
  return (
    <div className="van-container">
      <Link
        to={location.state?.search ? `..?${location.state?.search}` : ".."}
        relative="path"
        className="back-link"
        preventScrollReset
      >
        ← Back to {historyFilterUsed} Vans
      </Link>
      <React.Suspense fallback={<h3>Loading..</h3>}>
      <Await resolve={promiseData.vans}>
        {VanDetailViewer}
      </Await>
      </React.Suspense>
    </div>
  );
}
