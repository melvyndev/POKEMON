import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonService from '../models/pokemon-service';
import PokemonCard from './pokemon-card';
 
const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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
    <div className="row text-center "> 
    <img className='py-4 m-auto logo' src="/img/pokeball.jpg" />
    <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
    </div>

      <div className="row"> 
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
      ))}
      </div>
    </div>

  );
};

export default PokemonSearch;
