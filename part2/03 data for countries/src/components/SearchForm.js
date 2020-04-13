import React from 'react'

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