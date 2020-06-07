import React, { useState, useEffect } from 'react'
import PhonebookDisplay from './components/phoneBookDisplay/PhonebookDisplay'
import FilterForm from './components/FilterForm'
import AddForm from './components/AddForm'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  // the saved persons in the phonebook
  const [ persons, setPersons] = useState([]) //TODO add effect hook here?
  // new Name for phonebook entry
  const [ newName, setNewName ] = useState('')
  // new phonenumber for phonebook entry
  const [ newNumber, setNewNumber] = useState('')
  // filters entrys
  const [ nameFilter, setNameFilter] = useState('')
  // user notification
  const [ message, setMessage] = useState(null)
  // type of notification
  const [ messageType, setMessageType] = useState('')

  // imports persons from server
  const importPersons = () => {
    phonebookService
      .getAll()
      .then(persons => {
        setPersons(persons)
        displayMessage("successMessage", "Data loaded from server")
      })
      .catch(error => {
        console.log("an error occured loading phonebook data from server")
        displayMessage("errorMessage", "Data could not be loaded from server")
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

  const displayMessage = (messageType, message) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // adds a person to the phonebook or updates the phonenumber associated with that name
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    if (newPerson.name === ''){
      alert('name field is empty')
      displayMessage("errorMessage", "Person could not be added")
    }
    // checks if person with same name is already in the phonebook
    else if (persons.some(person => person.name === newPerson.name))
    {
      // if the same number is in the phonebook for this person it is not added to the phonebook
      if(persons.some(person => person.number === newPerson.number))
      {
        alert(`${newPerson.name} is already added to the phonebook`)
        displayMessage("errorMessage", "Person is already added to the phonebook")
      }
    // a new number can be saved for the specified person
    else
    {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`))
      {
        const toBeUpdated = persons.find(person => person.name === newPerson.name)

        phonebookService
        .update(newPerson, toBeUpdated.id)
        .then(response =>
          {
          setPersons(persons.map(person => person.id !== toBeUpdated.id ? person : response))
          displayMessage("successMessage", `phone number updated for ${newPerson.name}`)
          } 
        )
        .catch(error => 
          {
            console.log("failed to update person")
            displayMessage("errorMessage", error.response.data.error)
          }
        )
      }
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
          displayMessage("successMessage", `Added ${newPerson.name}`)
        })
        .catch( error =>
          {
            console.log("an error occured sending data to the server")
            displayMessage("errorMessage", error.response.data.error)
          }
        )
    }
  }

  const deleteEntry = (id) => {

    const toBeDeleted = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${toBeDeleted.name}?`))
    {
      phonebookService.erase(id)
      .then(response => {
        setPersons(persons.filter(person => person.name !== toBeDeleted.name))
        displayMessage("successMessage", `${toBeDeleted.name} has been removed`)
    })
      .catch(error => {
        setPersons(persons.filter(person => person.name !== toBeDeleted.name))
        displayMessage("errorMessage", error.response.data.error)
      })
    }
  }
  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <Notification message={message} messageType={messageType}></Notification>
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