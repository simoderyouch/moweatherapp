
import DateComponent from '../date';
import { IoNavigate } from "react-icons/io5";

import './Mainweather.css';



function Mainweather(props) {
    const Datadays = props.Datadays || {};
    const weather = props.weatherData || {};

    const visibilityMiles = weather.visibility / 1609.34

    return (

        <div className='weather-container'>
            <div className="weather-center">
                <div className="weather-days">


                    {Datadays && Datadays.length > 0 ? (Datadays.map((result) => (
                        <div className="weather-card" key={result.dt}>
                            <DateComponent date={result.dt_txt} />
                            <img src={require(`../../assets/${result.weather[0].icon}.svg`)} alt="" />
                            <div className='temp'><p>{`${Math.ceil(result.main.temp)}°C`}</p>
                                <p>{`${Math.floor(result.main.feels_like)}°C`}</p></div>
                        </div>

                    ))) : ""}

                </div>
                <div className="today-hightlight">
                    <h1 >Today's Highlights</h1>
                    <div className="today-hightlights-block">
                        <div className="today-hightlights-card">
                            <p>Wind status</p>
                            <h1>{weather && weather.main ? Math.floor(weather.wind.speed) : "-"}
                                <span>mph</span>
                            </h1>
                            <div className="deg">
                                <div className="cros"><IoNavigate style={{ transform: `rotate(${weather && weather.main ? weather.wind.deg : 90}deg)` }} /></div>
                                WSW
                            </div>
                        </div>
                        <div className="today-hightlights-card">
                            <p>Humidity</p>
                            <h1>{weather && weather.main ? Math.floor(weather.main.humidity) : "-"}
                                <span>%</span>
                            </h1>
                            <div className="bar-block">
                                <div className="bar-nbr">
                                    <p>0</p>
                                    <p>50</p>
                                    <p>100</p>
                                </div>
                                <div className="bar" ><span style={{ width: `${weather && weather.main ? weather.main.humidity : 20}%` }} ></span></div>
                                <p>%</p>
                            </div>
                        </div>
                        <div className="today-hightlights-card">
                            <p>Visibility</p>
                            <h1>{weather && weather.main ? visibilityMiles.toFixed(2) : "-"}
                                <span> miles</span>
                            </h1>

                        </div>
                        <div className="today-hightlights-card">
                            <p>Air Pressure</p>
                            <h1>{weather && weather.main ? Math.floor(weather.main.pressure) : "-"}
                                <span> mb</span>
                            </h1>

                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
}

export default Mainweather;