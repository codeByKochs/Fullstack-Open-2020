import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResultDisplay from './components/SearchResultDisplay'
import SearchForm from './components/SearchForm'


const App = () => {

    const [searchString, setSearchString ] = useState('')
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])

    // handles changes in the search input
    const handleSearchStringChange = (event) =>{
        console.log("event target value", event.target.value);
        setSearchString(event.target.value)
        console.log("searchString ", searchString)
        setCountriesToShow(countries.filter(country => country.name.toUpperCase().includes(searchString.toUpperCase())))
        //TODO hier noch einen Rerender forcen
    }

    // downloads country array via REST api
    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    useEffect(hook, [])

    return(
        <div>
            <SearchForm searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
            <SearchResultDisplay countries={countriesToShow} />
        </div>
    )
  }
  
  export default App