import React from 'react'

// used to search for countries

const SearchForm = ({searchString, handleSearchStringChange}) => {
    return(
        <div>
            <form>
                find countries
                <input value={searchString} onChange={handleSearchStringChange}/>
            </form>
        </div>
    )
}


export default SearchForm