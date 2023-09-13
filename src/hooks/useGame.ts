import * as React from "react";
import type { GameState, Player } from "../controller";
import { Tictactoe } from "../controller";

export const useGame = () => {
  const gameRef = React.useRef<Tictactoe>();
  const [gameState, setGameState] = React.useState<GameState>();

  const startGame = (players: Player[]) => {
    gameRef.current = new Tictactoe(players);
    setGameState(gameRef.current.getState());
  };

  if (!gameState || !gameRef.current) {
    return {
      startGame,
    };
  }

  return {
    gameState,
    makeMove: (playerId: string, coords: [number, number]) => {
      const newState = gameRef.current?.makeMove(playerId, coords);
      newState && setGameState(newState);
    },
    restart: () => {
      const newState = gameRef.current?.restart();
      newState && setGameState(newState);
    },
  };
};
