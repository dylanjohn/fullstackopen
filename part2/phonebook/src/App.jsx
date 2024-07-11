import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingUser = persons.find(person => person.name === newName)

    if (existingUser) {
      //alert(`${newName} is already added to phonebook`)
      const updatedPerson = { ...existingUser, number: newNumber }

      if (window.confirm(`Are you sure you want to update ${existingUser.name}?`)) {
        personService
        .update(existingUser.id, updatedPerson)
        .then(returnedPerson => {
            setPersons(persons.map(person =>
                person.id !== existingUser.id ? person : returnedPerson
            ));
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
            alert(`Failed to update ${newName}: ${error.message}`)
        })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`Failed to add ${newName}: ${error.message}`);
        })
    }
  }
  
  const filteredPersons = persons.filter(person =>
    person.name.includes(filterName)
  )

  const handleRemovePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
      .deleteResource(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`Failed to remove ${person.name}`)
     })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        filterName={filterName}
        handleFilterChange={handleFilterChange} 
      />

      <h2>add a new</h2>
      <PersonForm 
        newNumber={newNumber} 
        newName={newName} 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      <Persons 
        handleRemove={handleRemovePerson}
        filteredPersons={filteredPersons}
        />
    </div>
  )
}

export default App