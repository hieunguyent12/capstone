import Tile from "../game/Tile";

import Camp from "./Camp";
import CampType from "../game/Camp";
import Army from "../game/Army";
import Player from "../game/Player";

interface Props {
  tileInfo: Tile | null;
  buildCamp: (tile: Tile) => void;
  trainArmies: (camp: CampType | null, playerID: string | null) => void;
  selectedArmy: Army | null;
  selectArmy: (armyID: string | null) => void;
  getPlayer: (id: string) => {
    player: Player;
  } | null;
}

function TileInfo({
  tileInfo,
  selectArmy,
  selectedArmy,
  buildCamp,
  trainArmies,
  getPlayer,
}: Props) {
  if (tileInfo) {
    const player = getPlayer(tileInfo.playerID ?? "hi");

    return (
      <div
        className="flex flex-col"
        style={{
          width: "200px",
        }}
      >
        <p>
          {player?.player.color === "#4ade80" ? "You" : player?.player.color}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          onClick={() => {
            if (!selectedArmy) return;
            tileInfo.deployArmy(selectedArmy);
            selectArmy(null);
          }}
        >
          Deploy Army
        </button>
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
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-3"
            // style={{ border: "1px solid black" }}
            onClick={() => buildCamp(tileInfo)}
          >
            Build camp
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default TileInfo;
