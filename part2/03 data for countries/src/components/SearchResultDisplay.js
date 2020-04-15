// displays search results

// multiple results → 
//      more than 10 results → message
//      else display as list
// single result → display as SingleCountryDisplay

import React from 'react'
import SingleCountryDisplay from './SingleCountryDisplay'

const SearchResultDisplay = ({countries}) => {

    console.log("filtered countries", countries);

    if(countries.length === 0){
        return(
            <div>
                <p>No Country matching set filters</p>
            </div>
        )
    }

    if (countries.length > 10) {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }

    if (countries.length === 1){
        return(
            <SingleCountryDisplay country={countries[0]}/>
        )
    }


    return(
        <div>
            {countries.map(country => <p key={country.alpha2Code}>{country.name}</p>)}
        </div>
    )
}

export default SearchResultDisplay