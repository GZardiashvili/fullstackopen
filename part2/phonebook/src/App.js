import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import PersonForm from "./components/personform";
import Persons from "./components/persons";
import personSevice from "./services/persons";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="add">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [addMessage, setAddMessage] = useState(null);

  useEffect(() => {
    personSevice.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString,
    };
    const personToAdd = persons.map((p) => p.name);

    const updatePersonNumber = (id) => {
      const prs = persons.find((n) => n.id === id);
      const changedPrs = { ...prs };
      personSevice.update(id, changedPrs).then((response) => {
        setPersons(persons.map((pr) => (pr.id !== id ? pr : response.data)));
      });
    };

    if (personToAdd.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, relpace the old number with a new one?`
        )
      ) {
        updatePersonNumber("4ooXaGK");
      }

      setNewName("");
    } else {
      setAddMessage(`Added ${newName}`);
      setTimeout(() => {
        setAddMessage(null);
      }, 5000);
      personSevice.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        );

  const delPersonById = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`delete ${person.name}?`)) {
      axios.delete(url, person);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      {personsToShow.map((p, i) => (
        <Persons
          key={i}
          person={p.name}
          number={p.number}
          delPerson={() => delPersonById(p.id)}
        />
      ))}
    </div>
  );
};

export default App;
