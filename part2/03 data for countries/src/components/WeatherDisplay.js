import React from 'react'

const WeatherDisplay = ({countryName}) => {
    return(
        <div>
            <h3>Weather in {countryName}</h3>
            <p><b>temperature: </b>° Celsius</p>
            <img src='' alt='weather'></img>
            <p><b>wind: </b>mph direction </p>
        </div>
    )
}


export default WeatherDisplay