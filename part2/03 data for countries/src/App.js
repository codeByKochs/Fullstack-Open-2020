import React, { useState } from 'react';
import SearchForm from './components/SearchForm'
import CountryInfoForm from './components/CountryInfoForm';

const App = () => {

    const [searchString, setSearchString ] = useState('')

    const handleSearchStringChange = (event) =>{
        console.log(event.target.value);
        setSearchString(event.target.value)
    }

    return(
        <div>
            <SearchForm searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
            <CountryInfoForm />
        </div>
    )
  }
  
  export default App