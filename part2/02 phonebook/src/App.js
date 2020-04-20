import React, { useState, useEffect } from 'react'
import PhonebookDisplay from './components/phoneBookDisplay/PhonebookDisplay'
import FilterForm from './components/FilterForm'
import AddForm from './components/AddForm'
import phonebookService from './services/phonebookService'

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
    phonebookService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      // .catch(
      //   console.log("an error occured loading phonebook data from server")
      // )
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
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newName,
    }
    if (newPerson.name === ''){
      alert('name field is empty')
    }
    // checks if the new persons name is already in the phonebook
    else if (persons.some(person => person.name === newPerson.name)){
      alert(`${newPerson.name} is already added to the phonebook`)
    }
    else{
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log(persons);
          
        })
        // .catch(
        //   console.log("an error occured sending data to the server")
        // )
    }
  }

  const deleteEntry = (id) => {
    console.log("deleting entry with id: ", id)
    phonebookService.erase(id)

    setPersons(persons.filter(
      person => person.id !== id
      ))
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
        <PhonebookDisplay personList={persons} nameFilter={nameFilter} deleteEntry={deleteEntry} />
      </div>
    </div>
  )
}

export default App