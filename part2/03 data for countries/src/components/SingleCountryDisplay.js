import React from 'react'
import WeatherDisplay from './WeatherDisplay'

// displays information of a Country object

const SingleCountryDisplay = ({country}) => {

    const name = country.name
    const capital = country.capital
    const population = country.population
    const flag = country.flag
    const languages = country.languages
    

    return(
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>languages</h2>
            <ul>
                {languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={flag} width="300" height="200" alt=""/>
            <WeatherDisplay cityName={capital}/>
        </div>
    )
}

export default SingleCountryDisplay