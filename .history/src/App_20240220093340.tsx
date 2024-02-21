import React, { FunctionComponent, useState, useEffect } from 'react'
import PokemonList from './pages/pokemon-list';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonForm from './components/pokemon-form';
import PokemonEdit from './pages/pokemon-edit';
import PokemonSearch from './components/pokemon-search';
const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
		<Routes>
			<Route path="/" element={<PokemonList />} />
			<Route path="/search" element={<PokemonSearch />} />
			<Route path="pokemon/:id" element={<PokemonsDetail />} />
			<Route path="pokemon/edit/:id" element={<PokemonEdit />} />
		</Routes>
	</BrowserRouter>
      
    )
}

export default App;