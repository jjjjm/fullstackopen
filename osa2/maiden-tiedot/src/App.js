import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterSearch = (props) => {
  return (
    <div>
      find countries: <input
        value={props.searchWord}
        onChange={props.searchEvent}
      />
    </div>
  )
}

const Countries = ({ countries, activeEvent }) => {
  return (
    <div>
      {countries.map(country => <div key={country.name}>
        {country.name} <button onClick={() => activeEvent(country.name)}>{"show"}</button>
      </div>)}
    </div>
  )
}

const Country = ({ country, weatherInfo }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>{"capital"} {country.capital}</div>
      <div>{"population"} {country.population}</div>
      <h2>{"languages"}</h2>
      <ul>
        {country.languages.map(language => <li> {language.name} </li>)}
      </ul>
      <img src={country.flag} height="100" width="100"></img>
      <Weather country={country.name} weatherInfo={weatherInfo} />
      </div>
  )
}

const Weather = ({country, weatherInfo}) => {
  return(
    <div>
      <h2>{"weather"}</h2>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleActiveCountryChange = (countryName) => {
    setSearch(countryName)
  }

  const matched = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))

  const rows = matched.length > 10
    ? <div>{"Too many mathces, specify another filter"}</div>
    : matched.length === 1
      ? <Country country={matched.pop()} weatherInfo={weather} />
      : <Countries countries={matched} activeEvent={handleActiveCountryChange} />

  return (
    <div>
      <FilterSearch
        searchWord={search}
        searchEvent={handleSearchChange}
      />
      <div>{
        search.length > 0
          ? rows
          : ""
      }</div>
    </div>
  )
}

export default App