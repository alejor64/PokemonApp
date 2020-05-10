import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pokeDetalleAccion } from '../Redux/reducersDucks'

const Detalle = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = () => {
            dispatch(pokeDetalleAccion())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // console.log("TCL------>: Detalle -> pokemon", pokemon)

    return pokemon ? (
        <div className="card mt-6 text-center">
            <div className="card-body">
                <img src={pokemon.photo} className="img-fluid" alt="" />
                <div className="card-title text-uppercase"><strong>{pokemon.name}</strong></div>
                <p className="card-text">Heigth: {pokemon.heigth} | Width: {pokemon.width}</p>
            </div>
        </div>
    ) : null
}

export default Detalle