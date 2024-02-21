import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import PokemonService from '../models/pokemon-service';

type params = { id: string };
  
  const PokemonsDetail: FunctionComponent = () => {

  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  const { id }= useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonService = new PokemonService();
        const fetchedPokemon = await pokemonService.getPokemonById(Number(id));
        setPokemon(fetchedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
  
    fetchPokemon();
  }, [id]);
  
  return (
    <div>
      { pokemon ? (
        <div className="row">
             <div className="container">
    <div className="team-single">
        <div className="row">
            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                    <img className='w-100' src={pokemon.picture} alt={pokemon.name}  />
                    <Link to={`/pokemon/edit/${pokemon.id}`} className='btn btn-floating'><i className='material-icon material-symbols-outlined'>edit
</i></Link>
                </div>       
            </div>

            <div className="col-lg-8 col-md-7">
                <div className="team-single-text padding-50px-left sm-no-padding-left">
                    <h4 className="font-size38 sm-font-size32 xs-font-size30">{pokemon.name}</h4>
                    <p className="no-margin-bottom">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum voluptatem.</p>
                    <div className="contact-info-section margin-40px-tb">
                        <ul className="list-style9 no-margin">
                            <li>

                                <div className="row">
                                    <div className="col-md-5 col-5">
                                        <i className="fas fa-graduation-cap text-orange"></i>
                                        <strong className="margin-10px-left text-orange">Points de vie:</strong>
                                    </div>
                                    <div className="col-md-7 col-7">
                                        <p>{ pokemon.hp }</p>
                                    </div>
                                </div>

                            </li>
                            <li>

                                <div className="row">
                                    <div className="col-md-5 col-5">
                                        <i className="far fa-gem text-yellow"></i>
                                        <strong className="margin-10px-left text-yellow">Dégâts:</strong>
                                    </div>
                                    <div className="col-md-7 col-7">
                                        <p>{ pokemon.cp }</p>
                                    </div>
                                </div>

                            </li>
                            <li>

                                <div className="row">
                                    <div className="col-md-5 col-5">
                                        <i className="far fa-file text-lightred"></i>
                                        <strong className="margin-10px-left text-lightred">Type:</strong>
                                    </div>
                                    <div className="col-md-7 col-7">
                                    <td>
                                        {pokemon.types.map(type => (
                                        <span key={type} className={formatType(type)}>{type}</span>
                                        ))}
                                    </td>                                     </div>
                                </div>

                            </li>
                            <li>

                                <div className="row">
                                    <div className="col-md-5 col-5">
                                        <i className="fas fa-map-marker-alt text-green"></i>
                                        <strong className="margin-10px-left text-green">Date:</strong>
                                    </div>
                                    <div className="col-md-7 col-7">
                                        <p><td>{formatDate(pokemon.created)}</td></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <h5 className="font-size24 sm-font-size22 xs-font-size20">Professional Skills</h5>

                    <div className="sm-no-margin">
                        <div className="progress-text">
                            <div className="row">
                                <div className="col-7">Positive Behaviors</div>
                                <div className="col-5 text-right">40%</div>
                            </div>
                        </div>
                        <div className="custom-progress progress">
                        </div>
                        <div className="progress-text">
                            <div className="row">
                                <div className="col-7">Teamworking Abilities</div>
                                <div className="col-5 text-right">50%</div>
                            </div>
                        </div>
                        <div className="custom-progress progress">
                        </div>
                        <div className="progress-text">
                            <div className="row">
                                <div className="col-7">Time Management </div>
                                <div className="col-5 text-right">60%</div>
                            </div>
                        </div>
                        <div className="custom-progress progress">
                        </div>
                        <div className="progress-text">
                            <div className="row">
                                <div className="col-7">Excellent Communication</div>
                                <div className="col-5 text-right">80%</div>
                            </div>
                        </div>
                        <div className="custom-progress progress">
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-md-12">

            </div>
        </div>
    </div>
</div>
         
        </div>
        
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
     
    </div>
  );
}
  
export default PokemonsDetail;