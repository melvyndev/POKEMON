import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonService from '../models/pokemon-service';
import PokemonCard from '../components/pokemon-card';
 
const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonsData = await PokemonService.getPokemons();
      setPokemons(pokemonsData);
    };

    fetchPokemons();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
  
    if (term.length <= 1) {
      setPokemons([]);
      return;
    }
  
    PokemonService.searchPokemon(term).then((result) => {
      // Vérifier si result est null
      if (result === null) {
        setPokemons([]); // Aucun Pokémon trouvé, réinitialiser la liste
      } else {
        // Si result n'est pas null, mettre à jour la liste de Pokémon
        setPokemons(result);
      }
    });
  };
  

  return (
    <div className="container"> 
    <div className="row text-center justify-content-center "> 
    <img className='py-4 m-auto logo' src="/img/pokeball.jpg" />
    <div className="input-field">
              <input
               className='search__input'
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
    </div>

      <div className="row justify-content-center"> 
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
      ))}
      </div>
    </div>

  );
};

export default PokemonSearch;
