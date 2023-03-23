import { initialState } from '../store/gameSlicer'

export const recordToLocalStorage = (state: initialState) => {
  localStorage.setItem('state', JSON.stringify(state))
}

export const clearLocalStorageIfWin = () => {
  localStorage.removeItem('state')
}

export const retrieveLocalStorage = () => {
  const state = localStorage.getItem('state')
  if (state) return JSON.parse(state)
}