import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [searchKey, setSearchKey] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get("https://dog.ceo/api/breeds/list/all")
      const breedArray = [];

      for (const key in data.message) {
        const imgUrl = `https://dog.ceo/api/breed/${key}/images/random`
        const {data} = await axios.get(imgUrl);
        
        breedArray.push({ breedName: key, img: data.message });
      }
      setBreeds(breedArray);
    }

    fetchData();
  }, []);

  const searchKeyHandler = (key) => {
    const copyArray = [...breeds];
    const result = copyArray.filter(breed => breed.breedName.includes(key))
    setBreeds(result)
  }

  const breedList = breeds.map((breed) => (
    <span key={breed.breedName} className="Grid">
      <img src={breed.img} className="GridImg"/>
      <p>{breed.breedName}</p>
    </span>
  ));


  return (
    <div className="App">
      <header className="App-header">LIST ALL BREEDS</header>
      <input placeholder="Search for breed" onChange={(e) => searchKeyHandler(e.target.value)} />
      <div>{breedList}</div>
    </div>
  );
}

export default App;
