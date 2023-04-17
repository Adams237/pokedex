import {createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        value: []
    },
    reducers: {
        addPokemon: (state, action) => {
            state.value.push(action.payload);
        },
        removePokemon:(state,action) =>{
            console.log(action.payload);
            state.value = state.value.filter((pokemon)=>pokemon.id !== action.payload.id)
        }
    }
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;



