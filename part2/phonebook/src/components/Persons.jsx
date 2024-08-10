import Person from './Person'

const Persons = ({ filteredPersons, handleRemove }) => {
  if (filteredPersons.length === 0) {
    return <p>No matching numbers found.</p>
  }
  
  return(
    <ul>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} handleRemove={handleRemove}/>
        )}
    </ul>
  )
}

export default Persons