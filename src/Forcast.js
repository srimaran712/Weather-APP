import React from 'react'
import Axios from 'axios'
import { Api_key } from './Api'
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";

//https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=44.34&lon=10.99&appid=3b530cd63720281a642492476973d402
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`
function Forcast(props) {
    const [forcast,setForcast]=React.useState({list:[]})
    const fetchforcast=async()=>{
     const response= await  Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${Api_key}`)
     console.log(response.data)
     setForcast(response.data)
    }

    React.useEffect(()=>{
        fetchforcast()
    },[props.city])
   
  return (
    <div className="forcast-container">
        {forcast.list.map((cast,index)=>{
            return(
                <div key={index} className="forcast-box">


                    <h3 className="date">{new Date(cast.dt_txt).toLocaleString()}</h3>
                    <h1 className="for-temp">{(cast.main.temp-273.15).toFixed(2)} <TbTemperatureCelsius/></h1>
                    <h2 className="description2">{cast.weather[0].description}</h2>

                  <h4 className="humidity"><WiHumidity/>{cast.main.humidity} %</h4>
                    </div>
            )
        })}
      
    </div>
  )
}

export default Forcast
