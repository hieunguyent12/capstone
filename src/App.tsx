import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Prototype from "./components/Prototype";
import { GameProvider } from "./context/GameData";

function App() {
  const [isPlay, setIsPlay] = useState(false);

  if (!isPlay) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p className="text-2xl">THE BEST GAME EVER!!!!!!!</p>
        <button
          onClick={() => setIsPlay(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        >
          PLAY
        </button>
      </div>
    );
  }

  return (
    <GameProvider>
      <div className="App">
        <Prototype />
      </div>
    </GameProvider>
  );
}

export default App;
