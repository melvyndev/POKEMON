import React, { FunctionComponent, useState, useEffect } from 'react';
import usePokemons from '../hooks/pokemon.hook';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../models/pokemon-service';



  
const PokemonList: FunctionComponent = () => {
  const pokemons = usePokemons();


  return (
    <div>
      <div className="container"> 
      <div className="row text-center "> 
      <img className='py-4 m-aut logo' src="/img/pokeball.jpg" />
      </div>

        <div className="row"> 
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
        </div>
      </div>
    </div> 
  );
}
  
export default PokemonList;