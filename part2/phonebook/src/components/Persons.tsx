import Person from "src/components/Person";

const Persons = ({
  persons,
  removePerson,
}: {
  persons: Array<Person>;
  removePerson: Function;
}) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          removePerson={removePerson}
        ></Person>
      ))}
    </ul>
  );
};

export default Persons;
