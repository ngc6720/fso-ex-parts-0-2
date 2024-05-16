const Person = ({
  person,
  removePerson,
}: {
  person: Person;
  removePerson: Function;
}) => (
  <li>
    <span>
      {person.name} {person.number}
    </span>
    <button onClick={() => removePerson(person.id)}>Delete</button>
  </li>
);

export default Person;
