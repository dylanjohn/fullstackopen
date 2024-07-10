import Person from './Person'

const Persons = ({ filteredPersons, handleRemove }) => {
  return(
    <ul>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} handleRemove={handleRemove}/>
        )}
    </ul>
  )
}

export default Persons