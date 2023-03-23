import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TPlayerType = 'X' | 'O';

export interface ICell {
  position: number;
  value: null | TPlayerType,
}

export interface initialState {
  isCurrentPlayerFirst: boolean;
  isCurrentPlayerWinner: boolean;
  gameCells: Array<ICell>;
}

const initialState: initialState = {
  isCurrentPlayerFirst: true,
  isCurrentPlayerWinner: false,
  gameCells: [],
}


export const gamesSlice = createSlice({
  name: 'GAME_BOARD',
  initialState,
  reducers: {
    retrieveGame(state, action: PayloadAction<initialState>) {
      state.gameCells = action.payload.gameCells
      state.isCurrentPlayerFirst = !action.payload.isCurrentPlayerFirst
      state.isCurrentPlayerWinner = action.payload.isCurrentPlayerWinner
    },
    fillBoardCells(state, action: PayloadAction<Array<ICell>>) {
      state.gameCells = action.payload;
    },
    recordMoveToStore(state, action: PayloadAction<Array<ICell>>) {
      state.gameCells = action.payload
    },
    switchPlayer(state) {
      state.isCurrentPlayerFirst = !state.isCurrentPlayerFirst;
    },
    stopGame(state) {
      state.isCurrentPlayerWinner = true;
    }
  }
})