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
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0&language=fr');
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
  static async addPokemon(newPokemon: Pokemon): Promise<Pokemon> {
    try {
      const response = await axios.post(`http://localhost:3000/pokemon/}`, newPokemon);
      return PokemonService.mapPokemon(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du Pokémon :', error);
      throw new Error('Internal Server Error');
    }
  }

  static async deletePokemon(id: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/pokemon/${id}`);
    } catch (error) {
      console.error('Erreur lors de la suppression du Pokémon :', error);
      throw new Error('Internal Server Error');
    }
  }

  static async updatePokemon(id: number, updatedPokemon: Partial<Pokemon>): Promise<Pokemon> {
    try {
      // Récupérer le Pokémon existant
      const existingPokemon = await axios.get(`http://localhost:3000/pokemon/${id}`);

      // Fusionner les données existantes avec les données mises à jour
      const mergedPokemon = { ...existingPokemon.data, ...updatedPokemon };

      // Effectuer la mise à jour via une requête PUT ou PATCH
      const response = await axios.put(`http://localhost:3000/pokemon/${id}`, mergedPokemon);

      return PokemonService.mapPokemon(response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Pokémon :', error);
      throw new Error('Internal Server Error');
    }
  }

  static async searchPokemon(keyword: string): Promise<Pokemon | null> {
    try {
      // Effectuer une recherche de Pokémon par nom contenant le mot-clé
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${keyword.toLowerCase()}`);
  
      // Vérifier si un Pokémon a été trouvé
      if (response.data) {
        return PokemonService.mapPokemon(response.data);
      } else {
        // Si aucun Pokémon n'est trouvé, essayer de récupérer la liste des Pokémon
        const pokemonListResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0&language=fr`);
        
        // Rechercher dans la liste des Pokémon celui dont le nom contient le mot-clé
        const matchingPokemon = pokemonListResponse.data.results.find((pokemon: any) =>
          pokemon.name.includes(keyword.toLowerCase())
        );
  
        if (matchingPokemon) {
          const detailsResponse = await axios.get(matchingPokemon.url);
          return PokemonService.mapPokemon(detailsResponse.data);
        } else {
          return null; // Aucun Pokémon trouvé
        }
      }
    } catch (error) {
      // Ajoutez une vérification spécifique pour le cas où le Pokémon n'est pas trouvé
      if (error.response && error.response.status === 404) {
        console.log(`Aucun Pokémon contenant "${keyword}" n'a été trouvé dans l'API.`);
        return null;
      }
      console.error('Erreur lors de la recherche du Pokémon :', error);
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
