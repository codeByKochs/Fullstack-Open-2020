import React, { useState, useEffect } from 'react'
import Phonebook from './components/phonebook/Phonebook'
import FilterForm from './components/FilterForm'
import AddForm from './components/AddForm'
import axios from 'axios'

const App = () => {
  // the saved persons in the phonebook
  const [ persons, setPersons] = useState([]) //TODO add effect hook here?
  // new Name, which will be added to the phonebook
  const [ newName, setNewName ] = useState('')
  // new phonenumber, which will be added to the phonebook
  const [ newNumber, setNewNumber] = useState('')
  // filters entrys
  const [ nameFilter, setNameFilter] = useState('')

  // imports persons from server
  const importPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled');
        setPersons(response.data)
      })
  }
  useEffect(importPersons, [])


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