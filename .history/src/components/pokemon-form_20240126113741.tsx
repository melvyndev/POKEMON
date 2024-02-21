import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();

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

    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: {
        value: fieldValue,
        isValid: true
      }
    }));
  };

  const handleCheckboxChange = (type: string) => {
    setForm(prevForm => ({
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
    console.log('Form submitted:', form);
    navigate(`/pokemon/${pokemon.id}`);

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
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} className="img-fluid" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input value={form.name.value} id="name" name="name" type="text" className="form-control" onChange={handleInputChange} />
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp" className="form-label">Point de vie</label>
                  <input value={form.hp.value} id="hp" name="hp" type="number" className="form-control" onChange={handleInputChange} />
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp" className="form-label">Dégâts</label>
                  <input value={form.cp.value} id="cp" name="cp" type="number" className="form-control" onChange={handleInputChange} />
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label className="form-label">Types</label>
                  <div className="row">
                    {types.map(type => (
                      <div key={type} className="col-lg-3 col-md-4 col-sm-6" style={{ marginBottom: '10px' }}>
                        <div className="form-check">
                          <input id={type} type="checkbox" value={type} checked={hasType(type)} className="form-check-input" onChange={() => handleCheckboxChange(type)} />
                          <label htmlFor={type} className="form-check-label">
                            <p className={formatType(type)}>{type}</p>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
