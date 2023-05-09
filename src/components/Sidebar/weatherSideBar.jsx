import { useEffect, useState ,useCallback} from "react";
import DateComponent from "../date";
import { BiCurrentLocation } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggle, getTheLocation } from "../../store/features/searchSlice";
import { currentLocation } from "../currentLocation";
import Loading from "../loading";
function WeatherSidebar() {
  const [date, setDate] = useState(new Date());
  const { weatherInfo, isLoading, error } = useSelector(
    (state) => state.weather
  );

  const iconTag =
    weatherInfo && weatherInfo.main ? weatherInfo.weather[0].icon : "01d";
  const dispatch = useDispatch();
  const getLocation = useCallback(async () => {
    try {
      const location = await currentLocation();
      console.log(location);
      dispatch(getTheLocation(location));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  
  useEffect(() => {
    getLocation();
  },[getLocation]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="WeatherContainer">
      <div className="WeatherContainer-search-box">
        <button onClick={() => dispatch(toggle())}>Search for places</button>
        <button onClick={() => getLocation()}>
          <BiCurrentLocation />
        </button>
      </div>
      <Loading error={error} loading={isLoading}>
        {weatherInfo && (
          <>
            <div className="WeatherContainer-Icon">
              <img src={require(`../../assets/${iconTag}.svg`)} alt="" />
            </div>
            <div className="WeatherContainer-lat">
              {
                <>
                  <h1>{Math.round(weatherInfo.main.temp)}</h1>
                  <span>°C</span>
                </>
              }
            </div>

            <p className="WeatherContainer-description">
              {weatherInfo.weather[0].main}
            </p>
            <div className="WeatherContainer-info">
              <div className="WeatherContainer-date">
                <p>Today</p>
                <p>.</p>
                <DateComponent date={date} />
              </div>
              <p className="WeatherContainer-location">
                <span>
                  <MdLocationOn />{" "}
                </span>{" "}
                {weatherInfo.name}
              </p>
            </div>
          </>
        )}
      </Loading>
    </div>
  );
}

export default WeatherSidebar;
