import React from 'react'
import Axios from 'axios'
import {Api_key} from './Api'
import './App.css'
import Forcast from './Forcast'
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaTemperatureLow,FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaFan } from "react-icons/fa";

function Weather() {
    const [city,setCity]=React.useState('London')
    const [weather,setWeather]=React.useState([])


    const fetchApi=async()=>{
      const response= await  Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_key}`)
        console.log(response.data)
        console.log(response.data.main.feels_like)
        setWeather(response.data)
    }
    React.useEffect(()=>{
        fetchApi()

    },[])
        const weatherIcon=weather.weather?weather.weather[0].icon:null
const imgurl=`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
const lat=weather.coord?.lat
console.log(lat)
const lon=weather.coord?.lon
console.log(lon)
    const handleSubmit=(e)=>{
        e.preventDefault()
        fetchApi()
       

    }
  return (
    <div>
        <form onSubmit={handleSubmit} className="form-box">
            <input className="input-box" type="text" value={city} onChange={(e)=>{
                e.preventDefault()
                setCity(e.target.value) 
            }} placeholder="Enter the location "/>
            <button className="w-btn" type="submit">Get Weather</button>
        </form>
        <div className="temp-container">


        <div className="city-details">
            <h3 className="city-name">{weather.name}</h3>
            <h1 className="temp">{weather.main?.temp} <TbTemperatureCelsius/>  </h1>
            <h3 className="description">{weather.weather?weather.weather[0].description: null}</h3>
           <img src={imgurl} width="100px" height="100px" className="weather-icon"/>
            
            
        </div>

        <div className="other-details">
            <div className="box box-1">
                <h4 className="box-head feels">Feels Like</h4>
                <h2 className="box-value temp-value">{weather.main?.feels_like > 30 ?<FaTemperatureHigh/>:<FaTemperatureLow/> }{weather.main?.feels_like} <TbTemperatureCelsius/></h2>
                <p className="comments">Similar to actual temperature</p>
            </div>
            <div className=" box box-2">
                <h4 className="box-head feels">Humidity</h4>
                <h2 className="box-value Hum-value"><WiHumidity/>{weather.main?.humidity} %</h2>
                <p className="comments"></p>
            </div>
            <div className=" box box-3">
                <h4 className="box-head feels">Wind Speed</h4>
                <h2 className="box-value Hum-value"><IoSpeedometerOutline/>{weather.wind?.speed} Km/Hr</h2>
                <p className="comments"></p>
            </div>
            <div className=" box box-4">
                <h4 className="box-head feels">Air Pressure</h4>
                <h2 className="box-value Hum-value"><FaFan/>{weather.main?.pressure} hpa</h2>
                <p className="comments"></p>
            </div>
        </div>
        </div>
      
        <Forcast city={city} lat={lat} lon={lon}/>
      
    </div>
  )
}

export default Weather
