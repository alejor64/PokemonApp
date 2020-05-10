import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, pokeDetalleAccion } from '../Redux/reducersDucks'
import Detalle from './Detalle'

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
    // console.log("TCL------>: Pokemones -> pokemones", pokemones)

    return (
        <div className="row">
            <div className="col-md-5">
                <h3>Lista de pokemones</h3>
                <br />
                <div className="d-flex justify-content-between">
                    {
                        pokemones.length === 0 && 
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={()=> dispatch(obtenerPokemonesAccion())}>Get Pokemons</button>
                    }
            
                    {
                        next && 
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => dispatch(siguientePokemonAccion())}>Next Pokemons</button>
                    }

                    {
                        previous &&
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => dispatch(anteriorPokemonAccion())}>Previous Pokemons</button>
                    }

                </div>
            
                <ul className="list-group mt-3">
                    {
                    pokemones.map(pokemon=>
                        <li className="list-group-item text-uppercase" key={pokemon.name}>
                            {pokemon.name}
                            <button
                                onClick={() => dispatch(pokeDetalleAccion(pokemon.url))}
                                className="btn btn-danger btn-sm float-right">
                                Info
                            </button>
                        </li>)
                    }
                </ul>
            </div>
            <div className="col-md-5">
                <h3 className="text-center">Pokemon detail</h3>
                <Detalle />
            </div>
        </div>
    )
}

export default Pokemones