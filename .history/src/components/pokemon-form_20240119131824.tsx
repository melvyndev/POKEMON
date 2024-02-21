import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';

type Props = {
  pokemon: Pokemon;
};

type Field = {
  value: any;
  error?: string;
  isValid: boolean;
};

type Form = {
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: {
        value: type === 'number' ? parseInt(value, 10) : value,
        isValid: true, // Ajoutez la logique de validation ici si nécessaire
