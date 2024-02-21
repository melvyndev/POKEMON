import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../models/pokemon';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const fetchedPokemons = await Promise.all(response.data.results.map(async (pokemon: any) => {
          const detailsResponse = await axios.get(pokemon.url);
          return {
            id: detailsResponse.data.id,
            name: detailsResponse.data.name,
            hp: detailsResponse.data.stats[0].base_stat,
            cp: detailsResponse.data.stats[1].base_stat,
            picture: detailsResponse.data.sprites.front_default,
            types: detailsResponse.data.types.map((type: any) => type.type.name),
            created: new Date(),
          };
        }));
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  console.log(pokemons);
  return pokemons;
};

export default usePokemons;
