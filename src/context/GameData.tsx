import { createContext, useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";

import Game from "../game";

interface Props {
  children: JSX.Element;
}

export const GameContext = createContext<{
  game: Game;
  playerID: string;
} | null>(null);

export function GameProvider({ children }: Props) {
  const [playerID] = useState(nanoid());
  const [game] = useState<Game>(() => new Game(playerID));
  const [, rerender] = useState(0);

  useEffect(() => {
    const unsubscribe = game.listenForEvents(() => rerender((c) => c + 1));

    return () => unsubscribe();
  }, [game]);

  return (
    <GameContext.Provider value={{ game, playerID }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}
