import { useState, useEffect } from "react";
import axios from 'axios'

const CountryDetail = (props) => {
  const { country } = props
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p key="capital">capital {country.capital[0]}</p>
      <p key="area">area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (<li>{language}</li>))}
      </ul>
      <img src={country.flags['png']} alt={country.flags['alt']} />
    </div>
  )
}

const CountryItem = (props) => {
  const [shown, setShown] = useState(false)

  const { country } = props

  return shown
    ? <CountryDetail country={country} />
    : (
      <div>
        {country.name.common}<button onClick={() => setShown(true)}>show</button>
      </div>
    )

}

const Countries = (props) => {
  const { countries } = props
  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => <CountryItem country={country} />)}
      </>
    )
  }
  if (countries.length === 1) {
    const country = countries[0]
    debugger
    return <CountryDetail country={country} />
  }
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setAllCountries(response.data)
      })
  }, [])

  const onFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    setShowCountries(allCountries.filter((country) => {
      return country.name.common.toLowerCase().indexOf(newFilter) >= 0
    }))
  }

  return (
    <div>
      <div>
        find countries {allCountries.length > 0 ? <input value={filter} onChange={onFilterChange} /> : null}
      </div>
      <Countries countries={showCountries} />
    </div>
  );
}

export default App;
