// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [showContent, setShowContent] = useState(false);

//   useEffect(() => {
//     axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
//       setCountries(response.data);
//     });
//   }, []);

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const countriesToshow =
//     filter === ""
//       ? countries
//       : countries.filter((country) =>
//           country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
//         );

//   const showCountryContent = countriesToshow.map((country) => (
//     <div>
//       <h1 key={country.name}>
//         {country.name} <button>hide</button>{" "}
//       </h1>
//       capital {country.capital}
//       <p> population {country.population}</p>
//       <h2>languages</h2>
//       <ul>
//         {country.languages.map((language) => (
//           <li key={language.name}>{language.name}</li>
//         ))}
//       </ul>
//       <img src={country.flag} alt="flag" />
//     </div>
//   ));

//   const showCountries = countriesToshow.map((country) => (
//     <p key={country.name}>
//       {country.name}{" "}
//       <button onClick={() => setShowContent(!showContent)}>show</button>
//     </p>
//   ));

//   const showOrNot = () => {
//     if (showCountries.length === 1 || showContent === true) {
//       return showCountryContent;
//     } else if (showCountries.length < 10) {
//       return showCountries;
//     }
//     //   else if (showContent === true) {
//     //   return console.log("hmm"); }
//     else {
//       return <p>Too many matches, specify another filter</p>;
//     }
//   };

//   return (
//     <div>
//       <form>
//         <p>
//           find counties {<input value={filter} onChange={handleFilterChange} />}
//         </p>
//       </form>
//       {showOrNot()}
//     </div>
//   );
// };

// export default App;
