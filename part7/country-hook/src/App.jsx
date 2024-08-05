import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const countries = name !== null ? await axios.get('https://restcountries.com/v3.1/name/' + name) : null
      const c = countries?.data
        ? {
          found: true,
          data: {
            name: countries.data[0].name.official,
            capital: countries.data[0].capital[0],
            population: countries.data[0].population,
            flag: countries.data[0].flags.png,
          }
        }
        : null
      setCountry(c)
    }
    fetchData()
  }, [name]) // 使用useEffect's 第二个参数数组来控制效果函数的执行时间是很重要的

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App