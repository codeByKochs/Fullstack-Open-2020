import React from 'react'

const FilterForm = ({nameFilter, handleFilterChange}) => {
    return(
        <div className="FilterForm" >filter shown with<input value={nameFilter} onChange={handleFilterChange}></input></div>
    )
}

export default FilterForm