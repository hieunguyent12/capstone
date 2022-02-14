import React, { useEffect } from "react";
import { motion } from "framer-motion";

import Prototype from "./components/Prototype";
import { GameProvider } from "./context/GameData";

function App() {
  useEffect(() => {
    console.log('hi');
  });
  return (
    <GameProvider>
      <div className="App">
        <Prototype />
      </div>
    </GameProvider>
  );
}

export default App;
