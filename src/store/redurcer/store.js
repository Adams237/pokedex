import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSlice from "./userSlice";

const rootReduer = combineReducers({
    pokemonCapdured: pokemonSlice,
    currentUser: userSlice,
});
const persistConfig = {
    key:'root',
    version: 1,
    storage: AsyncStorage
};
const persistedRedurcer = persistReducer(persistConfig, rootReduer);
export const store = configureStore({
    reducer:persistedRedurcer,
    middleware:getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,REGISTER,PURGE]
        }
    })
});
export const persistor = persistStore(store);
