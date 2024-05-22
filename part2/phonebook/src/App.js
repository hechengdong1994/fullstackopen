import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [showPersons, setShowPersons] = useState(persons)

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