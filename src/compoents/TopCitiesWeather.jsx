import React, { useEffect, useState } from 'react';
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'



const topCities = {
  IN: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata'],
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  GB: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
  CA: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  DE: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  JP: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo'],
  CN: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  RU: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
  MX: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  KR: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  ZA: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  NG: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'],
  EG: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'],
  TR: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana'],
  SA: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  IR: ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Tabriz'],
  ID: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bekasi'],
  TH: ['Bangkok', 'Nonthaburi', 'Chiang Mai', 'Nakhon Ratchasima', 'Hat Yai'],
  PK: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi'],
  VN: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho'],
  BD: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  MY: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Ipoh', 'Kota Kinabalu'],
  PH: ['Manila', 'Quezon City', 'Cebu City', 'Davao City', 'Zamboanga City'],
  UA: ['Kyiv', 'Kharkiv', 'Odessa', 'Dnipro', 'Lviv'],
  SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  NL: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  CH: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
  PL: ['Warsaw', 'Krakow', 'Lodz', 'Wroclaw', 'Poznan'],
  BE: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  AT: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
  NO: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen'],
  DK: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  FI: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu'],
  NZ: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin']
};
const countrNames = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  JP: 'Japan',
  CN: 'China',
  BR: 'Brazil',
  IT: 'Italy',
  ES: 'Spain',
  RU: 'Russia',
  MX: 'Mexico',
  KR: 'South Korea',
  ZA: 'South Africa',
  AR: 'Argentina',
  NG: 'Nigeria',
  EG: 'Egypt',
  TR: 'Turkey',
  SA: 'Saudi Arabia',
  ID: 'Indonesia',
  PK: 'Pakistan',
  BD: 'Bangladesh',
  VN: 'Vietnam',
  PH: 'Philippines',
  MY: 'Malaysia',
  TH: 'Thailand',
  UA: 'Ukraine',
  SE: 'Sweden',
  NL: 'Netherlands',
  CH: 'Switzerland',
  PL: 'Poland',
  BE: 'Belgium',
  AT: 'Austria',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  NZ: 'New Zealand'
};

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




const TopCitiesWeather = ({ countryCode }) => {
  const [citiesWeather, setCitiesWeather] = useState([])
  const country = countryCode
  const cities = topCities[country] || []
  console.log("these are cities", cities)
  console.log("this is country code", country)



  useEffect(() => {

    const fetchCitiesWeather = async () => {
      const results = []

      if (!cities || !Array.isArray(cities)) return;

      for (const city of cities) {
        const fetchdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`)
        const res = await fetchdata.json()
        console.log(res.weather[0].icon)
        results.push({
          city,
          temp: `${Math.round(res.main.temp - 273.15)}°C`,
          condition: res.weather[0].description,
          icon: allIcons[res.weather[0].icon],
          res
        })
        const icons = allIcons[res.weather[0].icon]
        console.log("this is icons ", icons)
      }
      setCitiesWeather(results)
    }
    fetchCitiesWeather()

  }, [countryCode])
  console.log("this is citiesweather", citiesWeather)


  return (
    <div className="px-4 py-6">
      {cities.length === 0 ?
        (<p className="text-white text-center">No cities found for this country.</p>)
        :
        (<>  <h2 className="text-xl font-bold text-white mb-4">Top Cities in {countrNames[country]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4  items-center">
            {citiesWeather.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-2xl text-center shadow-md text-white hover:scale-105 transition-transform "
              >
                <h3 className="text-lg font-semibold mb-2">{item.city}</h3>
                <h3 className='text-lg '>{item.temp}</h3>
                <img
                  className=' w-[70px]'
                  src={item.icon}
                  alt="" />
                <p className="text-sm text-white/80">{item.condition}</p>
              </div>
            ))}
          </div>
        </>)}

    </div>
  );
};

export default TopCitiesWeather;
