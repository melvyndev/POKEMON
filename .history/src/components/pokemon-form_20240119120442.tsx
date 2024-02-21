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
  
const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {
  const [form,setForm]= useState<Form>({
    name:  {value: pokemon.name,isValid:true},
    hp: {value: pokemon.hp,isValid:true},
    cp:{value: pokemon.cp,isValid:true},
    types:{value: pokemon.types,isValid:true}
  })
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];
  const [formData, setFormData] = useState({
    name: '',
    hp: 0,
    cp: 0,
    types: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  const handleCheckboxChange = (type: string) => {
    setFormData({
      ...formData,
      types: formData.types.includes(type)
        ? formData.types.filter((t) => t !== type)
        : [...formData.types, type],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Faites quelque chose avec les données soumises (formData)
    console.log(formData);
  };

   
  return (
    <form onSubmit={handleSubmit} className="my-4">
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card">
          <div className="card-image">
            <img src={pokemon.picture} alt={pokemon.name} className="card-img-top" />
          </div>
          <div className="card-body">
            {/* Pokemon name */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Nom</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            {/* Pokemon hp */}
            <div className="form-group mb-3">
              <label htmlFor="hp" className="form-label">Point de vie</label>
              <input
                id="hp"
                type="number"
                className="form-control"
                value={formData.hp}
                onChange={handleInputChange}
              />
            </div>
            {/* Pokemon cp */}
            <div className="form-group mb-3">
              <label htmlFor="cp" className="form-label">Dégâts</label>
              <input
                id="cp"
                type="number"
                className="form-control"
                value={formData.cp}
                onChange={handleInputChange}
              />
            </div>
            {/* Pokemon types */}
            <div className="form-group mb-3">
              <label className="form-label">Types</label>
              {formatType.map((type) => (
                <div key={type} className="form-check form-check-inline">
                  <input
                    id={type}
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.types.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                  />
                  <label htmlFor={type} className={`form-check-label ${formatType(type)}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer text-center">
            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
  );
};
   
export default PokemonForm;