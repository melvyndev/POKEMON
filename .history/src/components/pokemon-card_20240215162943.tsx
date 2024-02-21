import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css';
import formatType  from '../helpers/format-type';
import formaDate from '../helpers/format-date';
import { useNavigate } from 'react-router-dom';
type Props = {
  pokemon: Pokemon,
  borderColor?:string 
};
  
const PokemonCard: FunctionComponent<Props> = ({pokemon, borderColor = '#009688'}) => {
 
  const [color, setColor] = useState<string>();
  const navigate = useNavigate();

 
  const showBorder = () => {
   setColor(borderColor);
   console.log('in');
   console.log(color);

  }

  const hideBorder = () => {
    setColor('#009688');
    console.log('leave');
    console.log(color);

  }

  const goToPokemon = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };


  return (
      <div className="col-6 col-md-2 col-lg-2" onClick={goToPokemon} onMouseEnter={showBorder} onMouseLeave={hideBorder} style={{borderColor:color}} >
          <div className="card card-pokemon my-4 px-2">
          <img
  src={pokemon.name && "/img/model/" + pokemon.name + ".gif" ? "/img/model/" + pokemon.name + ".gif" : pokemon.picture}
  alt={pokemon.name}
  className="card-img-top"
/>

          <h5 className="card-title">{pokemon.name}</h5>
         <p className="card-text">
           {pokemon.types.map(type => (
                <span className={formatType(type)+" capsule"} key={type}>{type} </span>
            ))}</p>
    </div>
    </div>
  );
}
  
export default PokemonCard;