import React from "react";

const Persons = ({ person, number, delPerson }) => {
  return (
    <div>
      {person} {number} <button onClick={delPerson}>delete</button>
    </div>
  );
};

export default Persons;
