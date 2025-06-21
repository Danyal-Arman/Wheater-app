import './weather.css'
import { format } from 'date-fns';

const Weather = (props) => {
  const get = props.city
  console.log(get)



  const currentDate = new Date();
  const day = currentDate.getDate() // for day of the month 
  const month = format(currentDate, 'MMMM')
  console.log()



console.log("this is props ",props.condition)

  return (
    <div className='container '>

      <img  className='img mx-auto  md:w-44 lg:w-40 ' src={props.Icon} alt="" />
      <div className="info space-y-4 md:space-y-2 flex flex-col">
      <div className="text-white flex text-2xl md:text-2xl md:pt-12  justify-center gap-2  ">
        <p >{day}</p>
        <p> | </p>
        <p>{month}</p>
      </div>
      <div className="flex justify-center ">
        <h1 className='text-white text-6xl '>{props.Temp}°</h1>
        <span className='text-white text-4xl '>C</span>
      </div>
      <p className='text-center text-4xl text-white'>{props.condition ? props.condition.charAt(0).toUpperCase() + props.condition.slice(1) : ''}</p>
      <div>
        <p className='text-center text-white text-4xl '>{props.city.charAt(0).toUpperCase() + props.city.slice(1)}</p>
      </div>
      </div>
    </div>
  )
}

export default Weather