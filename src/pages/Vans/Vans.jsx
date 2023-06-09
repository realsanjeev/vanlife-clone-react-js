import React from "react";
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
  return defer({vans: getVans()});
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const promisedVans = useLoaderData();
  const filterType = searchParams.get("type");

  function vansViewer(vans) {
    console.log(vans)
    const desiredVans = filterType
      ? vans.filter((van) => van.type.toLowerCase() === filterType.toLowerCase())
      : vans;

  
    const vanElements = desiredVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link 
          to={van.id} 
          state={{ search: searchParams.toString()}}>
          <img src={van.imageUrl} alt={`${van.type} van`} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              <span>${van.price}</span>
              <span>/day</span>
            </p>
          </div>
  
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));
    function handleFilter(key, value) {
      setSearchParams(prevParams => {
        if (value === null) {
          prevParams.delete(key);
        } else {
          prevParams.set(key, value);
        }
        return prevParams;
      });
    }
    return (
      <div>
        {/* Van filters */}
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handleFilter("type", "simple")}
            className={`van-type simple ${
              filterType === "simple" ? "selected" : ""
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilter("type", "rugged")}
            className={`van-type rugged ${
              filterType === "rugged" ? "selected" : ""
            }`}
          >
            Rugged
          </button>
          <button
            onClick={() => handleFilter("type", "luxury")}
            className={`van-type luxury ${
              filterType === "luxury" ? "selected" : ""
            }`}
          >
            Luxury
          </button>
          {filterType ? (
            <button
              onClick={() => handleFilter("type", null)}
              className="van-type clear-filters"
            >
              Clear filter
            </button>
          ) : null}
        </div>

        {/* Van list */}
        <div className="van-list">{vanElements}</div>
      </div>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <React.Suspense fallback={<h1>Loding </h1>}>
      <Await resolve={promisedVans.vans}>
        {vansViewer}
      </Await>
      </React.Suspense>
    </div>
  );
}