import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { gamesSlice } from '../store/gameSlicer';
import { ICell } from '../store/gameSlicer';
import { CELL_QUANTITY, checkIfCurrentPlayerWinner } from '../utils/logic';
import styles from './app.module.scss';
import {
  clearLocalStorageIfWin,
  recordToLocalStorage,
  retrieveLocalStorage,
} from '../utils/storage';

// Первый игрок ходит с X, он может выбирать первую ячейку
// Второй игрок ходит с O

const FirstPlayer = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);
  return (
    <div className={styles.cellContent}>
      <div
        className={`${styles.line} + ${styles.firstLine} + ${
          state ? styles.firstLineWrite : undefined
        }`}
      ></div>
      <div
        className={`${styles.line} + ${styles.secondLine} + ${
          state ? styles.secondLineWrite : undefined
        }`}
      ></div>
    </div>
  );
};

const SecondPlayer = () => {
  return (
    <div className={styles.cellContent}>
      <div className={styles.circle}></div>
      <div className={styles.circleLeft}></div>
      <div className={styles.circleRight}></div>
      <div className={styles.circleInner}></div>
    </div>
  );
};

const Cell: React.FC<{ value: null | 'X' | 'O'; position: number }> = ({
  value,
  position,
}) => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game);
  const handleClick = () => {
    if (gameState.gameCells[position].value) return; // при наличии значения в ячейке не позволяет дальнейшему коду работать

    const newGameCells: Array<ICell> = gameState.gameCells.map((el) => {
      return el.position !== position
        ? el
        : { ...el, value: gameState.isCurrentPlayerFirst ? 'X' : 'O' };
    });

    dispatch(gamesSlice.actions.recordMoveToStore(newGameCells));

    recordToLocalStorage({ ...gameState, gameCells: newGameCells }); // записываем в LS для возможности подгрузки данных при перезагрузке страницы

    const isGameOver = checkIfCurrentPlayerWinner(position, gameState);

    if (isGameOver) {
      dispatch(gamesSlice.actions.stopGame());
      clearLocalStorageIfWin();
      return;
    }

    dispatch(gamesSlice.actions.switchPlayer());
  };
  return (
    <div className={styles.cell} onClick={handleClick}>
      {value ? value === 'X' ? <FirstPlayer /> : <SecondPlayer /> : ''}
    </div>
  );
};

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = retrieveLocalStorage();
    if (state) {
      dispatch(gamesSlice.actions.retrieveGame(state));
      alert(`Сейчас очередь игрока ${state.isCurrentPlayerFirst ? 'O' : 'X'}`);
      return;
    } else {
      const generateDots = (n: number) => {
        let returnArr: Array<ICell> = [];
        for (let i = 0; i < n; i++) {
          returnArr.push({
            position: i,
            value: null,
          });
        }
        return returnArr;
      };
      const arr = generateDots(CELL_QUANTITY); // количество ячеек в игре
      dispatch(gamesSlice.actions.fillBoardCells(arr));
      return;
    }
  }, []);

  const board = useAppSelector((state) => state.game.gameCells);

  const ifCurrentUserWin = useAppSelector(
    (state) => state.game.isCurrentPlayerWinner
  );
  const currentPlayer = useAppSelector(
    (state) => state.game.isCurrentPlayerFirst
  );
  return (
    <div className={styles.appWrapper}>
      {ifCurrentUserWin ? (
        <div className={styles.announce}>
          {currentPlayer
            ? 'Поздравляем первого игрока (Х) с победой!'
            : 'Поздравляем второго игрока (О) с победой!'}
        </div>
      ) : (
        <div className={styles.gameWrapper}>
          {board.map((el, i) => {
            return <Cell key={i} position={i} value={el.value} />;
          })}
        </div>
      )}
    </div>
  );
};
