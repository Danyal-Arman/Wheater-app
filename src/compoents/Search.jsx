import { useState, useRef, useEffect } from 'react'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'


const Search = ({ setCities, setTemp, setIcon, setHumid, setWind, setCountry, setCondition }) => { // prop from app.jsx
  const [city, setCity] = useState('')


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



  const handleClick = async () => {
    if (city.length <= 0) {
      alert("Enter city name")
    }


    try {
      const fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`)

      const response = await fetchData.json()
      if (response.cod === '404') {
        alert("Place not found: Enter a valid country or city name")
        setCity("")
      }


      const celcius = Math.round(response.main.temp - 273.15)
      setTemp(celcius)
      const renderIcon = allIcons[response.weather[0].icon] || clear_icon
      setIcon(renderIcon)
      setHumid(response.main.humidity)
      setWind(response.wind.speed)
      setCity(city)
      setCountry(response.sys.country)
      setCondition(response?.weather[0]?.description)


    }
    catch (error) {
      console.error('Error fetching data:', error);

    }
  }





  const handleSubmit = (e) => {
    e.preventDefault();
    setCities(city) // ye wala city (state variable) mere app.jsx ke cities state me chla gaya

  }



  const handleChange = (e) => {
    setCity(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className="flex justify-center my-10 gap-4">
          <input onChange={handleChange} className='w-[30vw] h-[35px] rounded-full  pl-2 ' type="text" placeholder='search' />
          <button onClick={handleClick} type='submit' className='bg-white  px-3 rounded-full'><img src={search_icon} alt="" /></button>
        </div>
      </form>
    </div>

  )
}

export default Search