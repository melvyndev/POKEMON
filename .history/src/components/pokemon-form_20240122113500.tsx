import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
  
type Props = {
  pokemon: Pokemon
};

type Field = {
  value: any,
  error?: string,
  isValid:boolean,
};

type Form = {
  name: Field,
  hp: Field,
  cp:Field,
  types:Field
};
  
const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true }
  });

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleCheckboxChange = (type: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      types: {
        ...prevForm.types,
        value: prevForm.types.value.includes(type)
          ? prevForm.types.value.filter((t) => t !== type)
          : [...prevForm.types.value, type]
      }
    }));
  };

  // ... (types et constantes existants)

  return (
    <form>
      {/* ... (code existant) */}
      {/* Types de Pokémon */}
      <div className="form-group">
        <label>Types</label>
        {types.map((type) => (
          <div key={type} style={{ marginBottom: '10px' }}>
            <label>
              <input
                id={type}
                type="checkbox"
                value={type}
                checked={hasType(type)}  // Utilisez la fonction hasType ici
                className="filled-in"
                onChange={() => handleCheckboxChange(type)}
              />
              <span>
                <p className={formatType(type)}>{type}</p>
              </span>
            </label>
          </div>
        ))}
      </div>
      {/* ... (code existant) */}
    </form>
  );
};

export default PokemonForm;