import React from 'react'

// a html form for adding new persons to the phonebook
const AddForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <form onSubmit={addPerson}>
        <div>name:<input value={newName} onChange={handleNameChange} /></div>
        <div>number:<input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
        </form>
    )
}

export default AddForm