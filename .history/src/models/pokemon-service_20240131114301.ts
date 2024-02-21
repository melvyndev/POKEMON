
class PokemonService {
  async getPokemons() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0&language=fr');
      const fetchedPokemons = await Promise.all(response.data.results.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        return this.mapPokemon(detailsResponse.data);
      }));
      return fetchedPokemons;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Internal Server Error');
    }
  }

  async getPokemonById(id) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return this.mapPokemon(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      throw new Error('Internal Server Error');
    }
  }

  mapPokemon(data) {
    return {
      id: data.id,
      name: data.name,
      hp: data.stats[0].base_stat,
      cp: data.stats[1].base_stat,
      picture: data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
      created: new Date(),
    };
  }
}

module.exports = PokemonService;
