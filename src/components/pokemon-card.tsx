import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css';
import formatType from '../helpers/format-type';
import formatDate from '../helpers/format-date';
import { useNavigate } from 'react-router-dom';

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = '#009688' }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      navigate(`/pokemon/${pokemon.id}`);
    }, 2000);
  };

  return (
    <div className={`col-10 col-md-6 col-lg-3`} onClick={handleClick}>
      <div className="starters">
        <div className={`starter-container ${isActive ? 'active' : ''}`} style={{ borderColor: borderColor }}>
          <div className="pokeball">
            <div className="top-part"></div>
            <div className="bottom-part"></div>
            <div className="middle-part"></div>
            <div className="middle-circle"></div>
            <button className="pokeball-button">
              <img
                src={pokemon.name ? `../img/model/${pokemon.name}.gif` : pokemon.picture}
                alt={pokemon.name}
                className="img-pokemon starter-image"
              />
            </button>
          </div>
          <h2 className="pokemon-name">{pokemon.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
