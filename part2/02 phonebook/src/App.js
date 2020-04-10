import React, { useState } from 'react'
import PersonList from './components/PersonList'

const App = () => {
  // the saved persons in the phonebook
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1,}
  ])

  // new Name, which will be added to the phonebook
  const [ newName, setNewName ] = useState('')

  // adds a person to the persons array
  const addPerson = (event) => {
    event.preventDefault()
    console.log('add button clicked', event.target)
    const newPerson = {
      name: newName,
      id: persons.length + 1,
    }

    // checks if the new persons name is already in the phonebook
    if (persons.some(person => person.name === newPerson.name)){
      alert(`${newPerson.name} is already added to the phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  // tracks changes in the name input field
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <PersonList personList={persons} />
    </div>
  )
}

export default App