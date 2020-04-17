import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherDisplay = ({cityName}) => {
    const [weatherData, setWeatherData] = useState([])
    const [hasWeatherData, setHasWeatherData] = useState(false)

    const api_key = process.env.REACT_APP_API_KEY
    const requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + api_key


    const hook = () => {
        axios
            .get(requestURL)
            .then(response => {      
                console.log(response.data);
                
                setHasWeatherData(true)
                setWeatherData( {temperature: response.data.main.temp,
                                icon: "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png",
                                iconDescription: response.data.weather[0].description,
                                windSpeed: response.data.wind.speed,
                                windDirection: response.data.wind.deg})
            })
    }
    useEffect(hook, [])

    console.log(weatherData);
    

    if (hasWeatherData) {
        return (
                <div>
                    <h3>Weather in {cityName}</h3>
                    <p><b>temperature: </b>{weatherData.temperature}° Celsius</p>
                    <img src={weatherData.icon} alt={weatherData.iconDescription}></img>
                    <p><b>wind: </b>{weatherData.windSpeed} m/s direction {weatherData.windDirection}°</p>
                </div>
        )
    }
    else {
        return null
    }

}

export default WeatherDisplay