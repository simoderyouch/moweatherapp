import DateComponent from "../date";
import { IoNavigate } from "react-icons/io5";
import { useSelector } from "react-redux";
import "./Mainweather.css";
import Loading from "../loading";

function Mainweather() {
  const { weatherInfo, forecast,isLoading ,error } = useSelector((state) => state.weather);

  return (
    <div className="weather-container">
      <div className="weather-center">
       
        <div className="weather-days">
        <Loading error={error} loading={isLoading}>
          {forecast && forecast.length > 0 && (
            forecast.map((result) => (
              <div className="weather-card" key={result.dt}>
                <DateComponent date={result.dt_txt} />
                <img
                  src={require(`../../assets/${result.weather[0].icon}.svg`)}
                  alt=""
                />
                <div className="temp">
                  <p>{`${Math.ceil(result.main.temp)}°C`}</p>
                  <p>{`${Math.floor(result.main.feels_like)}°C`}</p>
                </div>
              </div>
            ))
          ) }
          </Loading>
        </div>
        <Loading error={error} loading={isLoading}>
        {weatherInfo && (
          <div className="today-hightlight">
            <h1>Today's Highlights</h1>
            <div className="today-hightlights-block">
              <div className="today-hightlights-card">
                <p>Wind status</p>
                <h1>
                  {Math.floor(weatherInfo.wind.speed)}
                  <span>mph</span>
                </h1>
                <div className="deg">
                  <div className="cros">
                    <IoNavigate
                      style={{
                        transform: `rotate(${weatherInfo.wind.deg}deg)`,
                      }}
                    />
                  </div>
                  WSW
                </div>
              </div>
              <div className="today-hightlights-card">
                <p>Humidity</p>
                <h1>
                  {Math.floor(weatherInfo.main.humidity)}
                  <span>%</span>
                </h1>
                <div className="bar-block">
                  <div className="bar-nbr">
                    <p>0</p>
                    <p>50</p>
                    <p>100</p>
                  </div>
                  <div className="bar">
                    <span
                      style={{
                        width: `${weatherInfo.main.humidity}%`,
                      }}
                    ></span>
                  </div>
                  <p>%</p>
                </div>
              </div>
              <div className="today-hightlights-card">
                <p>Visibility</p>
                <h1>
                  {(weatherInfo.visibility / 1609.34).toFixed(2)}
                  <span> miles</span>
                </h1>
              </div>
              <div className="today-hightlights-card">
                <p>Air Pressure</p>
                <h1>
                  {Math.floor(weatherInfo.main.pressure)}
                  <span> mb</span>
                </h1>
              </div>
            </div>
          </div>
        )}
        </Loading>
      </div>
    </div>
  );
}

export default Mainweather;
