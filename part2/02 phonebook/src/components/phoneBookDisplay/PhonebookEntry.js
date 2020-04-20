import React from 'react'

// creates a single paragraph with the name and the phonenumber of a personObject
const Entry = ({personObject, handleDeleteButtonClick}) => {
    return(
            <p key={personObject.name}>{personObject.name} - {personObject.number}<button onClick={handleDeleteButtonClick}>delete</button></p>
    )
}

export default Entry