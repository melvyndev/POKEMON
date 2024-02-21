import React, { FunctionComponent, useState, useEffect } from 'react';
import usePokemons from '../hooks/pokemon.hook';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../models/pokemon-service';



  
const PokemonList: FunctionComponent = () => {
  const pokemonService = new PokemonService();

  return (
    <div>
      <div className="container"> 
      <div className="row text-center "> 
      <img className='py-4 m-auto' src="http://fc00.deviantart.net/fs70/i/2012/308/0/b/__hd___pokemon_logo___hd___by_peetzaahhh2010-d5k08gz.png" />

      </div>

        <div className="row"> 
        {pokemonService.getPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
        </div>
      </div>
    </div> 
  );
}
  
export default PokemonList;