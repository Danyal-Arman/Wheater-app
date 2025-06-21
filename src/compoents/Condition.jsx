import React from 'react'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import './Condition.css'



const Condition = ({Humid, Wind}) => {
  return (
    <div>
      <div>
        <footer>
          <div className="container flex justify-between px-12 pt-[7rem] pb-8">

            <div className="humidity md:flex gap-3">
              <div className="img1 pt-2.5">
                <img src={humidity_icon} alt="" />
              </div>

              <div className="data  ">
                <p className='text-white text-xl '>{Humid} %</p>
                <p className='text-white text-xl '>Humidity</p>
              </div>
            </div>


            <div className="wind-speed md:flex gap-3">

              <div className='img2 pt-1'>
                <img src={wind_icon} alt="" />
              </div>

              <div className="data">
                <p className='text-white'>{Wind}  KM/H</p>
                <p className='text-white'>Wind Speed</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Condition
