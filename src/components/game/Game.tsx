import * as React from "react";
import { useGame } from "../../hooks/useGame";
import { Player } from "../../controller";
import cx from "classnames";

import * as LC from "./components";
import styles from "./game.module.scss";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const { gameState, makeMove, startGame, restart } = useGame();

  const handleStart = (players: Player[]) => {
    startGame && startGame(players);
  };

  if (gameState) {
    return (
      <div className={styles.wrapper}>
        {gameState.winner && (
          <LC.Winner
            name={gameState.players[gameState.winner].name}
            action={() => restart?.()}
          />
        )}

        {gameState.isDraw && <LC.Draw action={() => restart?.()} />}

        <div className={styles.players}>
          {Object.values(gameState.players).map((p) => (
            <div className={styles.player} key={p.id}>
              {p.id === gameState.currentPlayerId && (
                <span className="rounded-full w-6 h-6 absolute top-[50%] translate-y-[-50%] left-0 bg-rose-400" />
              )}
              <h1>
                {p.name} {p.sign}
              </h1>
            </div>
          ))}
        </div>

        <div className={styles.field}>
          {gameState.field.map((row, rowIndex) => (
            <div role="row" key={rowIndex} className={styles.row}>
              {row.map((element, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => {
                    makeMove(gameState.currentPlayerId, [rowIndex, colIndex]);
                  }}
                  className={cx(styles.cell, {
                    [styles.winnerCell]: gameState.winCobination?.some(
                      ([x, y]) => x === rowIndex && y === colIndex
                    ),
                  })}
                >
                  {element === null ? "" : element}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <LC.NewGame onStart={handleStart} />;
};

export default Game;
