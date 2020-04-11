import React, { useState } from 'react'
import Phonebook from './components/phonebook/Phonebook'
import FilterForm from './components/FilterForm'
import AddForm from './components/AddForm'

const App = () => {
  // the saved persons in the phonebook
  const [ persons, setPersons] = useState([])
  // new Name, which will be added to the phonebook
  const [ newName, setNewName ] = useState('')
  // new phonenumber, which will be added to the phonebook
  const [ newNumber, setNewNumber] = useState('')
  // filters entrys
  const [ nameFilter, setNameFilter] = useState('')

  //list of dummy entries for testing purposes
  // [{ name: 'Arto Hellas', number: '040-123456', id: 1},
  // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
  // { name: 'Dan Abramov', number: '12-43-234345', id: 3},
  // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},]

 // handles changes in the name input field
 const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
  }

// handles changes in the number input field
const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
  }

// handles changes in the filter input field
const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNameFilter(event.target.value)
  }



  // adds a person to the persons array
  const addPerson = (event) => {
    event.preventDefault()
    console.log('add button clicked', event.target)
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (newPerson.name === ''){
      alert('name field is empty')
    }
    // checks if the new persons name is already in the phonebook
    if (persons.some(person => person.name === newPerson.name)){
      alert(`${newPerson.name} is already added to the phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <FilterForm nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
        <h2>add a new entry</h2>
        <AddForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      </div>
      <div>
        <h2>Numbers</h2>
        <Phonebook personList={persons} nameFilter={nameFilter} />
      </div>
    </div>
  )
}

export default App