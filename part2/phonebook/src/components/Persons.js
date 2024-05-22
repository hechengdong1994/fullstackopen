const Persons = (props) => {
    return (
        <>
            {props.showPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons