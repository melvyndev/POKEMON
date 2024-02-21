import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../models/pokemon';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const fetchedPokemons = response.data.results.map((pokemon: any) => ({
          id: pokemon.url.split('/').slice(-2, -1)[0],
          name: pokemon.name,
          // Add other properties as needed
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
