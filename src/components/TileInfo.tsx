import Tile from "../game/Tile";

import Camp from "./Camp";
import CampType from "../game/Camp";
import Army from '../game/Army'

interface Props {
  tileInfo: Tile | null;
  buildCamp: (tile: Tile) => void;
  trainArmies: (camp: CampType | null, playerID: string | null) => void;
  selectedArmy: Army | null;
  selectArmy: (armyID: string | null) => void;
}

function TileInfo({ tileInfo, selectArmy, selectedArmy, buildCamp, trainArmies }: Props) {
  if (tileInfo) {
    return (
      <div>
        <p>{tileInfo.playerID}</p>
        <button onClick={() => {
          if (!selectedArmy) return;
          tileInfo.deployArmy(selectedArmy);
          selectArmy(null);
        }}>Deploy Army</button>
        {tileInfo.camp ? (
          <div>
            <Camp
              trainArmies={() => trainArmies(tileInfo.camp, tileInfo.playerID)}
            />
            <button
              className="bg-slate-800 text-white"
              onClick={() => console.log(tileInfo.camp?.trainingArmies)}
            >
              Remove camp
            </button>
          </div>
        ) : (
          // Refactor this shit
          <button style={{ border: "1px solid black" }} onClick={() => buildCamp(tileInfo)}>Build camp</button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default TileInfo;
