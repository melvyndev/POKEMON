import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteProps,useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import PokemonService from '../models/pokemon-service';
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent<RouteProps> = () => {
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const fetchedPokemon = await PokemonService.getPokemonById(parseInt(id, 10));
        setPokemon(fetchedPokemon);
      } catch (error) {
        // Handle error if necessary
        console.error(`Error fetching Pokemon with ID ${id}:`, error);
      }
    };

    fetchPokemon();
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