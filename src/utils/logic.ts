import { TPlayerType, initialState } from '../store/gameSlicer';

export const CELL_QUANTITY = 100;

export const checkIfCurrentPlayerWinner = (position: number, gameState: initialState): boolean => {
  let result: boolean;
  const currentPlayerType: TPlayerType = gameState.isCurrentPlayerFirst ? 'X' : 'O';
  let winningNeightbors = 1; // так как клетка всегда минимум себя считает
  const playedCells = gameState.gameCells.filter(el => el.value !== null)
  
  if (playedCells.length < CELL_QUANTITY ** 0.5 - 2) {
    console.log('not enough')
    result = false;
    return result;
    // подразумевается, что не имеет смысла проверять на победу, если кол-во недостаточно для победы любого игрока
  }
  
  const checkHorizontal = (position: number): void => {
    // проверяем является граница ли слева, отсутствие значения слева и наличие чужого значения
    const checkBack = (position: number) => {
      const backNeighbor = gameState.gameCells.filter(
        (el) => el.position === position - 1
      )[0];

      if (
        (position - CELL_QUANTITY ** 0.5) % 10 === 0 ||
        backNeighbor.value === null ||
        backNeighbor.value !== currentPlayerType
      )
        return;
      winningNeightbors++;
      checkBack(position - 1);
    };
    // проверяем является граница ли справа, отсутствие значения справа и наличие чужого значения
    const checkForward = (position: number) => {
      const forwardNeighbor = gameState.gameCells.filter(
        (el) => el.position === position + 1
      )[0];
      if (
        (position + 1 - CELL_QUANTITY ** 0.5) % 10 === 0 ||
        forwardNeighbor.value === null ||
        forwardNeighbor.value !== currentPlayerType
      )
        return;
      winningNeightbors++;
      checkForward(position + 1);
    };
    checkBack(position);
    checkForward(position);
  };

  const checkVertical = (position: number): void => {
    const checkBack = (position: number) => {
      const backNeighbor = gameState.gameCells.filter(
        (el) => el.position === position - CELL_QUANTITY**0.5
      )[0];
      if(position - CELL_QUANTITY ** 0.5 < 0 || backNeighbor.value === null || backNeighbor.value !== currentPlayerType) return
      winningNeightbors++;
      checkBack(position - CELL_QUANTITY**0.5);
    }
    const checkForward = (position: number) => {
      const forwardNeighbor = gameState.gameCells.filter(
        (el) => el.position === position + CELL_QUANTITY**0.5
      )[0];
      if (
        position + CELL_QUANTITY ** 0.5  > CELL_QUANTITY ||
        forwardNeighbor.value === null ||
        forwardNeighbor.value !== currentPlayerType
      )
        return;
      winningNeightbors++;
      checkForward(position + CELL_QUANTITY**0.5);
    }
    checkBack(position)
    checkForward(position)
  }

  const checkDiagonalNegative = (position: number): void => {
    const checkBack = (position: number) => {
      const backNeighbor = gameState.gameCells.filter(
        (el) => el.position === position - CELL_QUANTITY**0.5 - 1
      )[0];
      if(position - CELL_QUANTITY ** 0.5 - 1 < 0 || backNeighbor.value === null || backNeighbor.value !== currentPlayerType) return
      winningNeightbors++;
      checkBack(position - CELL_QUANTITY**0.5 - 1);
    }
    const checkForward = (position: number) => {
      const forwardNeighbor = gameState.gameCells.filter(
        (el) => el.position === position + CELL_QUANTITY**0.5 + 1
      )[0];
      if (
        position + CELL_QUANTITY ** 0.5 + 1 > CELL_QUANTITY ||
        forwardNeighbor.value === null ||
        forwardNeighbor.value !== currentPlayerType
      )
        return;
      winningNeightbors++;
      checkForward(position + CELL_QUANTITY**0.5 + 1);
    }
    checkBack(position)
    checkForward(position)
  }

  const checkDiagonalPositive = (position: number): void => {
    const checkBack = (position: number) => {
      const backNeighbor = gameState.gameCells.filter(
        (el) => el.position === position - CELL_QUANTITY**0.5 + 1
      )[0];
      if(position - CELL_QUANTITY ** 0.5 + 1 < 0 || backNeighbor.value === null || backNeighbor.value !== currentPlayerType) return
      winningNeightbors++;
      checkBack(position - CELL_QUANTITY**0.5 + 1);
    }
    const checkForward = (position: number) => {
      const forwardNeighbor = gameState.gameCells.filter(
        (el) => el.position === position + CELL_QUANTITY**0.5 - 1
      )[0];
      if (
        position + CELL_QUANTITY ** 0.5 - 1 > CELL_QUANTITY ||
        forwardNeighbor.value === null ||
        forwardNeighbor.value !== currentPlayerType
      )
        return;
      winningNeightbors++;
      checkForward(position + CELL_QUANTITY**0.5 - 1);
    }
    checkBack(position)
    checkForward(position)
  }

  checkHorizontal(position);

  if (winningNeightbors >= 5) return result = true;
  result = false;
  winningNeightbors = 1;

  checkVertical(position)

  if (winningNeightbors >= 5) return result = true;
  result = false;
  winningNeightbors = 1;

  checkDiagonalNegative(position)

  if (winningNeightbors >= 5) return result = true;
  result = false;
  winningNeightbors = 1;

  checkDiagonalPositive(position)

  if (winningNeightbors >= 5) return result = true;
  result = false;
  winningNeightbors = 1;

  return false // дефолтное значение при ошибке расчетов
};