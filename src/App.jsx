import './App.css'
import Condition from './compoents/Condition';
import Weather from './compoents/Weather'
import Search from './compoents/Search'
import clear_icon from './Assets/clear.png'
import cloud_icon from './Assets/cloud.png'
import drizzle_icon from './Assets/drizzle.png'
import rain_icon from './Assets/rain.png'
import snow_icon from './Assets/snow.png'
import { useState, useEffect } from 'react';
import TopCitiesWeather from './compoents/TopCitiesWeather';


function App() {
  const [cities, setCities] = useState("");
  const [country, setCountry] = useState("")
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [humid, setHumid] = useState();
  const [wind, setWind] = useState();
  const [condition, setCondition] =useState()
  const [CurrentLocation, setCurrentLocation] = useState()
  const allIcons = {

    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }

  const weatherProps = { city: cities, Temp: temp, Icon: icon, Location: CurrentLocation, condition:condition };
  const conditionProps = { Humid: humid, Wind: wind };

  const fetchWeatherData = async ({ lat, lon }) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_APP_ID}`);
      const weatherData = await response.json();


      const degree = Math.floor(weatherData.main.temp - 273.15)
      const renderIcon = allIcons[weatherData.weather[0].icon] || clear_icon
      setTemp(degree);
      setIcon(renderIcon)
      setCities(weatherData.name)
      setHumid(weatherData.main.humidity);
      setWind(weatherData.wind.speed);
      setCountry(weatherData?.sys?.country)
      setCondition(weatherData?.weather[0].description)
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {


    navigator.geolocation.getCurrentPosition(

      (position) => {
        fetchWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude })
      },
      (error) => {
        console.error("Not able to get the location:", error)
      }
    )
  }, [])



  return (
      <>
    <div className=" md:my-4 min-h-screen  md:overflow-y-auto max-w-3xl mx-auto border-2 sm:rounded-2xl border-red-200 bg-gradient-to-b from-gray-300 via-gray-500  to-gray-800">
      <Search setCities ={setCities} setTemp ={setTemp}  setIcon={setIcon} setHumid = {setHumid} setWind={setWind} setCurrentLocation ={setCurrentLocation} setCountry={setCountry} setCondition={setCondition}/>
      <Weather {...weatherProps}/>
      <Condition {...conditionProps}/>
      <TopCitiesWeather countryCode={country} />
      </div>
      </>
     
  )
} 

export default App
