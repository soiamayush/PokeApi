import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CardItem from './CardItem';

const Search = (props) => {
  const [allPokemons, setAllPokemons] = useState([]);
  
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [loading, setLoading] = useState(true);

  

  const params = useParams();

  const term = params.term;
 

  const getAllPokemons = async () => {
    
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async () => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
        setLoading(false);
      });
    }
    createPokemonObject(data.results);
  };

  
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  
  
  
  const handleSearch =(e) => {
    e.preventDefault();
    
    if(keyword){
      navigate(`/search/${keyword}`)
    }
    else{
      navigate('/search')
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  

  function refreshPage() {
    props.setprogress(40)
  setTimeout(() => {
      window.location.reload(false);
    }, 10);
    props.setprogress(100)
  }
    
  return (

<div className='container '>
  <div className='row '>
    
    <div className="col-12 col-md-10 mt-2 mt-md-0 mx-auto">

         
      <form onSubmit={handleSearch}>
 <div className="input-group  my-5">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Search Your Pokemon"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" onClick={refreshPage}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>

      {allPokemons.slice(0, 1).map((pokemonStats, index) => (
            <div className="col-md-6 mx-auto" key={allPokemons.id}>
              <CardItem
                key={index}
                // id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
                id={pokemonStats.id}
              />
            </div>
          ))}
       
      </div>
      </div>
</div>
  )
}

export default Search