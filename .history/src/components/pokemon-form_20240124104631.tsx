import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';

type Props = {
  pokemon: Pokemon
};

type Field = {
  value: any,
  error?: string,
  isValid: boolean,
};

type Form = {
  name: Field,
  hp: Field,
  cp: Field,
  types: Field
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue, isValid: true } };

    setForm({ ...form, ...newField });
  };

  const handleCheckboxChange = (type: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      types: {
        ...prevForm.types,
        value: prevForm.types.value.includes(type)
          ? prevForm.types.value.filter((t: string) => t !== type)
          : [...prevForm.types.value, type]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    // You can access the form data using the `form` state
    console.log('Form submitted:', form);
  };

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* ... (rest of the component) ... */}
      </div>
    </form>
  );
};

export default PokemonForm;
