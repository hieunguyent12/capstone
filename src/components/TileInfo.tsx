import Tile from "../game/Tile";

import Camp from "./Camp";

interface Props {
  tileInfo: Tile | null;
  buildCamp: (tile: Tile) => void;
  trainArmies: () => void;
  deployArmies: () => void;
}

function TileInfo({ tileInfo, buildCamp, trainArmies, deployArmies }: Props) {
  if (tileInfo) {
    return (
      <div>
        <p>{tileInfo.playerID}</p>

        {tileInfo.camp ? (
          <div>
            <Camp trainArmies={trainArmies} deployArmies={deployArmies} />
            <button className="bg-slate-800 text-white">Remove camp</button>
          </div>
        ) : (
          <button onClick={() => buildCamp(tileInfo)}>Build camp</button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default TileInfo;
