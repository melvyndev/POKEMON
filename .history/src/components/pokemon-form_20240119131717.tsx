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

  const hasType=(type:string):boolean=>{
    return form.types.value.includes(type)
  }
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];
   
  return (
    <form>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="card">
            <div className="card-img-top">
              <img src={pokemon.picture} alt={pokemon.name} className="img-fluid" />
            </div>
            <div className="card-body">
              {/* Pokemon name */}
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  value={form.name.value}
                  id="name"
                  type="text"
                  className="form-control"
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
                />
              </div>
              {/* Pokemon types */}
              <div className="form-group">
                <label>Types</label>
                {formatType.map((type) => (
                  <div key={type} className="form-check form-check-inline">
                    <input
                      id={type}
                      type="checkbox"
                      value={type}
                      checked={form.types.value.includes(type)}
                      onChange={() => handleCheckboxChange(type)}
                      className="form-check-input"
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