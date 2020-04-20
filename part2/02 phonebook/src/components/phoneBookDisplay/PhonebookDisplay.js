import React from 'react'
import Entry from './PhonebookEntry'

// displays an array of persons in paragraphs
const PhonebookDisplay = ({personList, nameFilter, deleteEntry}) => {

    // filters persons if filter string is not empty
    const personsToShow = nameFilter ==='' ? personList : personList.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    return (
        <div className="PhonebookDisplay">
            {personsToShow.map(
                personObject =>
                    <Entry   personObject={personObject}
                             handleDeleteButtonClick={() => deleteEntry(personObject.id)}
                             key={personObject.id} 
                    />                         
                             )
            }
        </div>
    )
}

export default PhonebookDisplay