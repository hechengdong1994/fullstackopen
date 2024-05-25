import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const [showPersons, setShowPersons] = useState([])

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const effectHook = () => {
    personService
      .getAll()
      .then((initialData) => {
        setPersons(initialData)
        setShowPersons(initialData)
      })
  }
  useEffect(effectHook, [])

  const onRemoveClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(removedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
          setShowPersons(showPersons.filter(p => p.id !== person.id))
        })
        .catch((error) => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

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
    const existPerson = persons.find((person) => person.name === newName)
    if (existPerson) {
      // 模版字符串
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = { name: newName, number: newNumber }
        personService
          .update(existPerson.id,)
          .then(replacePerson => {
            const newPersons = persons.map(p => p.id === existPerson.id ? newPerson : p)
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
            setFilter('')
            setShowPersons(newPersons)
            setMessage(`Added ${newPerson.name} `)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          const newPersons = persons.concat(newPerson)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setFilter('')
          setShowPersons(newPersons)
          setMessage(`Added ${newPerson.name} `)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
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
      <Persons showPersons={showPersons} onRemoveClick={onRemoveClick} />
    </div>
  )
}

export default App