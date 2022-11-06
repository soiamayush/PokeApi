import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import Spinner from "./Spinner";


function Cards() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );


  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
        setLoading(false);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line

  }, []);

  

  return (
    <div className="cards">
            <h1 className="my-3">Pokemons!</h1>
          

      {loading && <Spinner />}
      

      <div className="container ">
        <div className="row">
          {allPokemons.map((pokemonStats, index) => (
            <div className="col-md-3" key={allPokemons.id}>
              <CardItem
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />
            </div>
          ))}
        </div>
        <div className="text-center">

          <button className="load-more " onClick={() => getAllPokemons()}>Load more</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
