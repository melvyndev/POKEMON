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
    // Reset form after submission if needed
    // setForm({ name: { value: '', isValid: true }, hp: { value: 0, isValid: true }, cp: { value: 0, isValid: true }, types: { value: [], isValid: true } });
  };

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <div className="card hoverable px-4">
            {/* ... (rest of the component) ... */}
            <div className="card-action center">
              {/* Submit button */}
              <button type="submit" className="btn btn-primary">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
