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
          ? prevForm.types.value.filter((t: string) => t !== type)
          : [...prevForm.types.value, type]
      }
    }));
  };
  

  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

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
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input value={form.name.value} id="name" type="text" className="form-control" />
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp" className="form-label">Point de vie</label>
                  <input value={form.hp.value} id="hp" type="number" className="form-control" />
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp" className="form-label">Dégâts</label>
                  <input value={form.cp.value} id="cp" type="number" className="form-control" />
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label className="form-label">Types</label>
                  {types.map(type => (
                    <div key={type} style={{ marginBottom: '10px' }}>
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