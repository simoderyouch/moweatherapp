
import { useEffect, useState } from "react";
import { IoClose, IoSearch, IoChevronForwardSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading";
import {
  toggle,
  searchForLocation,
  getTheLocation,
  FetchLocation,
} from "../../store/features/searchSlice";
import { FetchWeather, fetchForecast } from "../../store/features/weatherSlice";

function SearchSideBar() {
  const dispatch = useDispatch();
  const [btnSearchClick, setBtnSearchClick] = useState(false);
  const { isShow, searchLocation, locationList, error, isLoading, location } =
    useSelector((state) => state.searchInfo);

  const handleChange = (event) => {
    setBtnSearchClick(false);
    dispatch(searchForLocation(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchLocation !== null) {
      setBtnSearchClick(true);
      dispatch(FetchLocation(searchLocation));
    }
  };
  useEffect(() => {
    dispatch(FetchWeather(location));
    dispatch(fetchForecast(location));
  }, [location, dispatch]);

  return (
    <div className={`Location-search ${isShow ? "setShow" : ""}`}>
      <button className="Close-btn" onClick={() => dispatch(toggle())}>
        {" "}
        <IoClose />
      </button>
      <form className="Search-form" onSubmit={handleSubmit}>
        <IoSearch />
        <input
          className="search-input"
          type="text"
          value={searchLocation || ""}
          onChange={handleChange}
          placeholder="search location"
        />

        <button type="submit" onSubmit={handleSubmit}>
          Search
        </button>
      </form>

      <div className="search-block">
        {btnSearchClick ? (
          <Loading error={error} loading={isLoading}>
            {locationList.map((result) => (
              <button
                className="search-result"
                key={result.id}
                data-lat={result.coord.lat}
                data-lon={result.coord.lon}
                onClick={() => {
                  dispatch(
                    getTheLocation({
                      name: result.name,
                      lat: result.coord.lat,
                      lon: result.coord.lon,
                    })
                  );
                  dispatch(toggle());
                }}
              >
                {result.name} - {result.sys.country}
                <IoChevronForwardSharp />
              </button>
            ))}
          </Loading>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchSideBar;
