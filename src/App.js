
import './App.css';
import './global.css';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import Mainweather from './components/main-weather/Mainweather'

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [forecast, setforecast] = useState({});
  console.log(process.env.REACT_APP_API_KEY)
  async function getWeatherData(lat, lon) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    setWeatherData(data);

  }
  async function getDatafor7days(lat, lon) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_API_KEY}&lat=${lat}&lon=${lon}&units=metric`;

    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    const forecast = data.list.filter((weather, index) => {

      if (index === 0 || index % 8 === 0) {
        return weather;
      }

      return false;
    });

    setforecast(forecast)
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherData(position.coords.latitude, position.coords.longitude)
        getDatafor7days(position.coords.latitude, position.coords.longitude)
      });
    } else {
      getWeatherData(0, 0)
      getDatafor7days(0, 0)

    }


  }
  function handleCity(lat, lon) {
    getWeatherData(lat, lon)
    getDatafor7days(lat, lon)

  }

  useEffect(() => {
    if (!navigator.geolocation) {
      getWeatherData(0, 0)
      getDatafor7days(0, 0)
    }
    navigator.geolocation.getCurrentPosition((position) => {
      getWeatherData(position.coords.latitude, position.coords.longitude)
      getDatafor7days(position.coords.latitude, position.coords.longitude)
    });

  }, []);




  return (
    <div className='main-app'>

      <Sidebar setCityClick={handleCity} current={getLocation} weatherData={weatherData} />

      <Mainweather Datadays={forecast} weatherData={weatherData} />
    </div>

  );
}

export default App;
