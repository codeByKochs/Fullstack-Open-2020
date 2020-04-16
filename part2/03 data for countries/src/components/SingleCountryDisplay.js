import React from 'react'

// displays information of a Country object

const SingleCountryDisplay = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt=""/>
        </div>
    )
}

export default SingleCountryDisplay