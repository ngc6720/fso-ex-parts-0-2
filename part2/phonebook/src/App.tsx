import { useState, useMemo, useEffect, useRef } from "react";
import Persons from "src/components/Persons";
import Filter from "src/components/Filter";
import Phoneform from "src/components/Phoneform";
import Notification from "src/components/Notification";
import personsService from "src/services/persons";

function App() {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newName, setNewName] = useState("");
  const [newNumb, setNewNumb] = useState("");
  const [search, setSearch] = useState("");

  const [notification, setNotification] = useState<Notif | null>(null);
  const timerRef = useRef<number | null>(null);

  const notify = (notif: Notif) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setNotification(notif);
    timerRef.current = setTimeout(() => setNotification(null), 5000);
  };

  // Clear timeout if component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((e) => console.error(e));
  }, []);

  const displayedPersons = useMemo(() => {
    return search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );
  }, [persons, search]);

  const updatePerson = (id: string, newPerson: Person) => {
    personsService
      .update(id, newPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p))
        );
        notify({
          type: "success",
          message: `Modified "${returnedPerson.name}"`,
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: `Information about "${newPerson.name}" has already been removed from the server`,
        });
        setPersons(persons.filter((p) => p.id !== id));
      });
    setNewName("");
    setNewNumb("");
  };

  const addPerson = (e: any) => {
    e.preventDefault();
    // format string for checking & displaying
    // remove extra spaces
    const nuName = newName.toLowerCase().replace(/\s+/g, " ").trim();
    // capitalize first letters
    const nuDisplayName = nuName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newPerson: Person = {
      name: nuDisplayName,
      number: newNumb.replace(/\s+/g, "").trim(),
    };

    const id = persons.find((p) => nuName === p.name.toLowerCase())?.id;

    // Person already in phonebook
    if (id) {
      if (
        window.confirm(
          `${nuDisplayName} is already added to the phonebook, replace the old number with a new one ?`
        )
      ) {
        updatePerson(id, newPerson);
      }
      return;
    }

    personsService.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      notify({ type: "success", message: `Added "${returnedPerson.name}"` });
    });
    setNewName("");
    setNewNumb("");
  };

  const removePerson = (id: string) => {
    const p = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${p?.name} ?`)) {
      personsService
        .remove(id)
        .then((returnedPerson) =>
          setPersons(persons.filter((p) => p.id !== returnedPerson.id))
        )
        .catch(() => {
          notify({
            type: "error",
            message: `Information about "${p?.name}" has already been removed from the server`,
          });
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };
  return (
    <div>
      <Notification notification={notification}></Notification>
      <h1>FSO - Part 2 - Phonebook</h1>

      <h2>Add new number</h2>
      <Phoneform
        onSubmit={addPerson}
        name={newName}
        number={newNumb}
        onName={(e) => setNewName(e.target.value)}
        onNumber={(e) => setNewNumb(e.target.value)}
      ></Phoneform>
      <h2>Filter by name</h2>
      <Filter
        name="Search"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      ></Filter>
      <h2>Numbers</h2>
      <Persons persons={displayedPersons} removePerson={removePerson}></Persons>
      <button
        onClick={() => {
          const notifType = Math.random() < 0.5 ? "error" : "success";
          notify({
            message: notifType + " " + Math.random(),
            type: notifType,
          });
        }}
      >
        TEST RANDOM NOTIF
      </button>
    </div>
  );
}

export default App;
