import React from 'react'

// creates a single paragraph with the name and the phonenumber of a personObject
const Entry = ({personObject}) => {
    return(
        <p>{personObject.name} - {personObject.number}</p>
    )
}

export default Entry