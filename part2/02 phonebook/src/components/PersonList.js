import React from 'react'

// creates a single paragraph with the name of a personObject
const Entry = ({personObject}) => {
    return(
        <p>{personObject.name}</p>
    )
}

// displays an array of persons in paragraphs
const PersonList = ({personList}) => {
    return (
        <div>
            {personList.map(personObject => <Entry personObject={personObject} key={personObject.id} />)}
        </div>
    )
}

export default PersonList