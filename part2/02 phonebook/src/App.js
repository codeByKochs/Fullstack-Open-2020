import React, { useState, useEffect } from 'react'
import PhonebookDisplay from './components/phoneBookDisplay/PhonebookDisplay'
import FilterForm from './components/FilterForm'
import AddForm from './components/AddForm'
import phonebookService from './services/phonebookService'

const App = () => {
  // the saved persons in the phonebook
  const [ persons, setPersons] = useState([]) //TODO add effect hook here?
  // new Name for phonebook entry
  const [ newName, setNewName ] = useState('')
  // new phonenumber for phonebook entry
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
    }
    
    if (newPerson.name === ''){
      alert('name field is empty')
    }
    // checks if person with same name is already in the phonebook
    else if (persons.some(person => person.name === newPerson.name))
    {
      // if the same number is in the phonebook for this person it is not added to the phonebook
      if(persons.some(person => person.number === newPerson.number))
      {
        alert(`${newPerson.name} is already added to the phonebook`)
    }
      // a new number can be saved for the specified person
    else
    {
      window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
        
      phonebookService
        .update(newPerson)
        .then(response => 
          setPersons(persons.map(person => person.id !== newPerson.id ? person : response)))
    }
  }

    // creates a new phonebook entry
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

    const toBeDeleted = persons.find(person => person.id === id)

    window.confirm(`Delete ${toBeDeleted.name}?`)

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