import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [showPersons, setShowPersons] = useState([])

  const effectHook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response)
        setPersons(response.data)
        setShowPersons(response.data)
      })
  }
  useEffect(effectHook, [])

  const onFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    setShowPersons(newFilter === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase())))
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.findIndex((person) => person.name === newName) >= 0) {
      // 模版字符串
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      setFilter('')
      setShowPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        onChange={onFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
        onSubmit={onSubmit}
      />
      <h3>Numbers</h3>
      <Persons showPersons={showPersons} />
    </div>
  )
}

export default App