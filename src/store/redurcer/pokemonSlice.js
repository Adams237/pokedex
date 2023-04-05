import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        value: []
    },
    reducers: {
        addPokemon: (state, action) => {
            // console.log(action.payload);
            // state({...state.value, action.payload});
            state.value.push(action.payload);
            // console.log(state.value);
        },
        removePokemon:(state,action) =>{
            console.log(action.payload);
            state.value = state.value.filter((pokemon)=>pokemon.id !== action.payload.id)
        }
    }
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage: AsyncStorage
// };
// const persistedRedurcer = persistReducer(persistConfig, pokemonSlice.reducer);

// export const store = configureStore({
//     reducer: persistedRedurcer,
//     middleware: getDefaultMiddleware({
//         ignoredAction: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER]
//     })
// });

// export const persistor = (store);

