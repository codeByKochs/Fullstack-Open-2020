import React from 'react'

const FilterForm = ({nameFilter, handleFilterChange}) => {
    return(
        <div>filter shown with<input value={nameFilter} onChange={handleFilterChange}></input></div>
    )
}

export default FilterForm