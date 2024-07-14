import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [warning, setWarning] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)

  // Fetch all countries once
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCountries(filtered)
      handleWarnings(filtered)
      fetchCountryDetails(filtered)
    } else {
      clearResults()
    }

  }, [searchTerm, countries])


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleWarnings = (filtered) => {
    if (filtered.length > 10) {
      setWarning('Too many matches, please refine your search')
    } else {
      setWarning(null)
    }
  }

  const fetchCountryDetails = (filtered) => {
    if (filtered.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filtered[0].name.common}`)
        .then(response => {
          console.log(response.data)
          setCountryDetails(response.data)
        })
        .catch(error => {
          console.error(`Error fetching details for ${filtered[0].name.common}:`, error)
        })
    } else {
      setCountryDetails(null)
    }
  }

  const clearResults = () => {
    setFilteredCountries([])
    setWarning(null)
    setCountryDetails(null)
  }

  return (
    <>
      <div>
        find countries: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      {warning ? (
        <div>{warning}</div>
      ) : (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countryDetails && (
        <div>
          <h2>{countryDetails.name.common}</h2>
          <p>Capital: {countryDetails.capital}</p>
          <p>Population: {countryDetails.population}</p>
          <p>Region: {countryDetails.region}</p>
          <p>Subregion: {countryDetails.subregion}</p>
          <img src={countryDetails.flags.svg} alt={`Flag of ${countryDetails.name.common}`} width="100" />
        </div>
      )}
    </>
  )
}

export default App