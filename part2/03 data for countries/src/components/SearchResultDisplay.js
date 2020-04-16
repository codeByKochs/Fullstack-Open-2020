import React from 'react'
import SingleCountryDisplay from './SingleCountryDisplay'

const SearchResultDisplay = ({countries, filter, setFilter}) => {

    // applying filter to countries
    countries = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

    switch (true){
        case countries.length === 0:{
            return <p>No Country matching set filters</p>
        }

        case countries.length > 10:{
            return <p>Too many matches, specify another filter</p>
        }

        case countries.length === 1:{
            return <SingleCountryDisplay country={countries[0]}/>
        }

        case countries.length>1 && countries.length<10:{
            return countries.map(country => 
                <p key={country.alpha2Code}>{country.name}<button onClick={() => setFilter(country.name)}>show</button></p>
                )
        }

        default:
            return null
    }
}

export default SearchResultDisplay