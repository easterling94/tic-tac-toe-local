import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { gamesSlice } from './gameSlicer';

const rootReducer = combineReducers({
  game: gamesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;