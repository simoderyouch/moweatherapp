import { useState, useEffect } from 'react';
import DateComponent from '../date';
import { BiCurrentLocation } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { IoClose, IoSearch, IoChevronForwardSharp } from "react-icons/io5";



import './Sidebar.css';




function WeatherSidebar(props) {
    const [date, setDate] = useState(new Date());
    const weather = props.weather || {};
    const iconTag = weather && weather.main ? weather.weather[0].icon : '01d';



    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    return (
        <div className='WeatherContainer'>
            <div className='WeatherContainer-search-box'>
                <button onClick={props.onClick}>Search for places</button>
                <button onClick={props.currentLoc}><BiCurrentLocation /></button>
            </div>
            <div className='WeatherContainer-Icon'>
                <img src={require(`../../assets/${iconTag}.svg`)} alt="" />
            </div>
            <div className='WeatherContainer-lat'>{weather && weather.main ? (
                <>
                    <h1>{Math.round(weather.main.temp)}</h1>
                    <span>°C</span>
                </>
            ) : (
                <h1>-</h1>
            )}</div>

            <p className='WeatherContainer-description'>{weather && weather.main ? weather.weather[0].main : '-'}</p>
            <div className="WeatherContainer-info">
                <div className='WeatherContainer-date'>
                    <p>Today</p>
                    <p>.</p>
                    <DateComponent date={date} />
                </div>
                <p className='WeatherContainer-location'><span><MdLocationOn /> </span> {weather ? weather.name : '-'}</p>
            </div>
        </div>
    );
}


function SearchSideBar(props) {

    const [value, setValue] = useState('');

    const [searchResults, setSearchResults] = useState([]);



  
    async function listCity() {



        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${process.env.REACT_APP_API_KEY}`;

        try {
            const response = await fetch(weatherApiUrl);
            const data = await response.json();
            setSearchResults(data.list);

        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = (event) => {
        if (value !== '') {
            event.preventDefault();
            listCity()

        }


    };

    const getLocation = (event) => {
        const lat = Number(event.target.getAttribute('data-lat'));
        const lon = Number(event.target.getAttribute('data-lon'));
        if (props.onSelectCity) {
            props.onSelectCity(lat, lon);
        }

    };
    const handleChange = (event) => {
        setValue(event.target.value);

    };

    return (
        <div className='Location-search'>
            <button className='Close-btn' onClick={props.onClick}> <IoClose /></button>
            <form action="" className='Search-form' onSubmit={handleSubmit}>

                <IoSearch />
                <input className="search-input"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder='search location' />


                <button type="submit" onSubmit={handleSubmit}>Search</button>
            </form>
            <div className="search-block">

                {
                    searchResults.length > 0 ?
                        searchResults.map((result) => (
                            <button className="search-result" key={result.id} data-lat={result.coord.lat} data-lon={result.coord.lon} onClick={getLocation}  >
                                {result.name} - {result.sys.country}
                                <IoChevronForwardSharp />
                            </button>
                        )) : value !== '' ?
                            <div className='error'>

                                <h3>Result Not Found</h3>
                                <p>Whoops...this information is not availble for a moment</p>
                            </div>

                            : ''
                }

            </div>
        </div>
    );

}
function Sidebar(props) {
    const [showComponentA, setShowComponentA] = useState(true);

    function handleClick() {
        setShowComponentA(!showComponentA);
    }
    function handleSelectCity(lat, lon) {

        props.setCityClick(lat, lon)
        setShowComponentA(true)
    }

    return (


        <>
            {showComponentA ? ' ' : <SearchSideBar onSelectCity={handleSelectCity} onClick={handleClick} />}
            <WeatherSidebar weather={props.weatherData} currentLoc={props.current} onClick={handleClick} />
        </>
    );
}

export default Sidebar;
