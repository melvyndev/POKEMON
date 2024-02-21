import express from 'express';
import PokemonService from './PokemonService';

const app = express();
const port = 3000;

const pokemonService = new PokemonService();

app.use(express.json());

app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await pokemonService.getPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await pokemonService.getPokemonById(Number(id));
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
