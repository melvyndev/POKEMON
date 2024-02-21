import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  hp: number;
  cp: number;
  picture: string;
  types: string[];
  created: Date;
}

class PokemonService {
  static async getPokemons(): Promise<Pokemon[]> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0&language=fr');
      const fetchedPokemons = await Promise.all(response.data.results.map(async (pokemon: any) => {
        const detailsResponse = await axios.get(pokemon.url);
        return PokemonService.mapPokemon(detailsResponse.data);
      }));
      return fetchedPokemons;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Internal Server Error');
    }
  }

  static async getPokemonById(id: number): Promise<Pokemon> {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return PokemonService.mapPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Internal Server Error');
    }
  }

  private static mapPokemon(data: any): Pokemon {
    return {
      id: data.id,
      name: data.name,
      hp: data.stats[0].base_stat,
      cp: data.stats[1].base_stat,
      picture: data.sprites.front_default,
      types: data.types.map((type: any) => type.type.name),
      created: new Date(),
    };
  }
}

export default PokemonService;
