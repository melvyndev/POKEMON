import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteProps,useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent<RouteProps> = () => {
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  
  useEffect(() => {
      // Utilisez find pour rechercher le Pokémon par ID
    const foundPokemon = POKEMONS.find(p => p.id.toString() === id);

    if (foundPokemon) {
      setPokemon(foundPokemon);
    } else {
      // Gérez le cas où aucun Pokémon n'est trouvé
      console.error(`Aucun Pokémon trouvé avec l'ID ${id}`);
    }
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;