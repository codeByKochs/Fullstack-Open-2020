import React from 'react'
import Entry from './PhonebookEntry'

// displays an array of persons in paragraphs
const Phonebook = ({personList, nameFilter}) => {

    // filters persons to show if filter string is not empty
    const personsToShow = nameFilter ==='' ? personList : personList.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    return (
        <div>
            {personsToShow.map(personObject => <Entry personObject={personObject} key={personObject.id} />)}
        </div>
    )
}

export default Phonebook