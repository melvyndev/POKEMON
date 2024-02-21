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
      },
    }));
  };

  const handleCheckboxChange = (type: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      types: {
        value: prevForm.types.value.includes(type)
          ? prevForm.types.value.filter((t) => t !== type)
          : [...prevForm.types.value, type],
        isValid: true, // Ajoutez la logique de validation ici si nécessaire
      },
    }));
  };

  return (
    <form>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    value={form.name.value}
                    id="name"
                    type="text"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    value={form.hp.value}
                    id="hp"
                    type="number"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    value={form.cp.value}
                    id="cp"
                    type="number"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {formatType.map((type) => (
                    <div key={type} style={{ marginBottom: '10px' }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          value={type}
                          checked={form.types.value.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className="filled-in"
                        />
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
