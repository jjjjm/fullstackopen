import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Success = ({ text }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
  }
  return (
    <div style={successStyle}>
      {text}
    </div>
  )
}

const Error = ({ text }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
  }
  return (
    <div style={errorStyle}>
      {text}
    </div>
  )
}

const FilterSearch = (props) => {
  return (
    <div>
      filter shown with: <input
        value={props.searchWord}
        onChange={props.searchEvent}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
          value={props.name}
          onChange={props.nameEvent}
        />
      </div>
      <div>
        number: <input
          value={props.number}
          onChange={props.numberEvent}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} person={person} buttonClickHandler={() => deleteHandler(person)} />)}
    </div>
  )
}

const Button = ({ text, onClickEvent }) => {
  return (
    <button onClick={onClickEvent}>
      {text}
    </button>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number} <Button text={"delete"} onClickEvent={props.buttonClickHandler} />
    </div>
  )
}

const App = () => {
  /* States */
  const [persons, setPersons] = useState([])
  const [name, setname] = useState('')
  const [number, setnumber] = useState('')
  const [search, setSearch] = useState('')
  const [successState, setSuccessState] = useState(<></>)
  const [errorState, setErrorState] = useState(<></>)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])



  /* Form event handler */

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name, number }
    if (persons.map(person => person.name).includes(name)) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with new one`)) {
        updatePerson(personObject)
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          successStateSetter(`Added ${personObject.name}`)
        }).catch( error => {
          errorStateSetter(error.response.data.error)
        })
      setname('')
      setnumber('')
    }
  }

  const updatePerson = (personObject) => {
    personObject.id = persons.find(person => name.includes(person.name)).id
    personService
      .update(personObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== personObject.id ? person : personObject))
        successStateSetter(`Modified ${personObject.name} number to ${personObject.number}`)
      })
      .catch(error => {
        errorStateSetter(`Information of ${personObject.name} has already been removed from the server`)
      })
  }

  const deletePerson = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name} ?`)) {
      personService
        .remove(deletedPerson.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          successStateSetter(`Deleted ${deletedPerson.name}`)
        })
        .catch(error => {
          errorStateSetter(`Information of ${deletedPerson.name} has already been removed from the server`)
        })
    }
  }

  const errorStateSetter = (message) => {
    setErrorState(<Error text={message} />)
    setTimeout(() => {
      setErrorState(<></>)
    }, 5000)
  }

  const successStateSetter = (message) => {
    setSuccessState(<Success text={message} />)
    setTimeout(() => {
      setSuccessState(<></>)
    }, 5000)
  }

  /* Change event handlers */

  const personChange = (event) => {
    setname(event.target.value)
  }

  const numberChange = (event) => {
    setnumber(event.target.value)
  }

  const searchChange = (event) => {
    setSearch(event.target.value)
  }

  const visiblePersons = search.length > 0
    ? persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      {successState}
      {errorState}
      <FilterSearch
        searchWord={search}
        searchEvent={searchChange}
      />
      <h2>Add New</h2>
      <PersonForm
        addPerson={addPerson}
        name={name}
        nameEvent={personChange}
        number={number}
        numberEvent={numberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} deleteHandler={deletePerson} />
    </div>
  )

}

export default App