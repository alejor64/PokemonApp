import axios from 'axios'

//Constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}


// TYPES
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTES_POKEMONES_EXITO = 'SIGUIENTES_POKEMONES_EXITO'
const ANTERIORES_POKEMONES_EXITO = 'ANTERIORES_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'


// Reducers
export default function pokeReducer (state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}

        case SIGUIENTES_POKEMONES_EXITO:
            return {...state, ...action.payload}

        case ANTERIORES_POKEMONES_EXITO:
            return {...state, ...action.payload}

        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}

        default:
            return state
    }
}


// Actions
export const obtenerPokemonesAccion = () => async (dispatch) => {

    if (localStorage.getItem('offset=0')) {
        // console.log('Datos guardados')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        }) 
        return
    }

    try {
        console.log('Datos de la Api')
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const next = getState().pokemones.next
    
    if (localStorage.getItem(next)) {
        dispatch({
            type: SIGUIENTES_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        }) 
        return
    }

    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTES_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const previous = getState().pokemones.previous

    if (localStorage.getItem(previous)) {
        dispatch({
            type: SIGUIENTES_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        }) 
        return
    }
    
    try {
        const res = await axios.get(previous)
        dispatch({
            type: ANTERIORES_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const pokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {

    if( localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    
    try {
        const res = await axios.get(url)
        // console.log(res.data)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                name: res.data.name,
                width: res.data.weight,
                heigth: res.data.height,
                photo: res.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            name: res.data.name,
            width: res.data.weight,
            heigth: res.data.height,
            photo: res.data.sprites.front_default
        }))
    } catch (err) {
        console.log(err)
    }

}