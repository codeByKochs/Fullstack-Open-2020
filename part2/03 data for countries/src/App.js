import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchResultDisplay from './components/SearchResultDisplay'
import SearchForm from './components/SearchForm'


const App = () => {

    const [filter, setFilter ] = useState('')
    const [countries, setCountries] = useState([])

    // handles changes in the search input
    const handleSearchStringChange = (event) =>{
        event.preventDefault()
        setFilter(event.target.value)
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
            <SearchForm searchString={filter} handleSearchStringChange={handleSearchStringChange} />
            <SearchResultDisplay countries={countries} filter={filter} setFilter={setFilter}/>
        </div>
    )
  }
  
  export default App