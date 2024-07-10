const Person = ({ person, handleRemove }) => {

  return (
    <li>{person.name} {person.number} <button onClick={() => handleRemove(person.id)}>delete</button></li>
  )
}

export default Person