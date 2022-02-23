import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameData";
import MapManager from "../game/MapManager";
import Tile from "./Tile";
import { TilePosition } from "../types/gameTypes";
import _Tile from "../game/Tile";
import Game from "../game";
import PlayerInfo from "./PlayerInfo";
import TileInfo from "./TileInfo";
import Camp from "./Camp";
import CampType from "../game/Camp";
import Armies from "./Armies";
import Army from "../game/Army";
// import { ExampleComponent } from "revolutionary-component";
const TILE_SIZE = 50;

export default function Prototype() {
  // TODO keep a list of army as state
  // drag and drop to tile

  const [tileInfo, setTileInfo] = useState<_Tile | null>(null);
  const [selectedArmy, setSelectedArmy] = useState<Army | null>(null);
  const [selectedDeployingArmy, setDeployArmy] = useState<Army | null>(null);
  const progressbarRef = useRef<any>();
  const [startedTimer, setStartedTimer] = useState(false);
  const gameData = useGame();

  useEffect(() => {
    console.log("%c DEEZ NUTS lol", "color:blue; font-size:50px");
  }, []);

  // useEffect(() => {
  //   if (gameData?.game.canAttack) {
  //     return;
  //   }
  //   // setStartedTimer(true);
  //   let width = 1;
  //   const id = setInterval(frame, 3 * 10);

  //   function frame() {
  //     if (width >= 100) {
  //       clearInterval(id);
  //       // setStartedTimer(false);
  //     } else {
  //       width++;

  //       if (progressbarRef && progressbarRef.current) {
  //         progressbarRef.current.style.width = width + "%";
  //       }
  //     }
  //   }

  //   // return () => {
  //   //   clearInterval(id);
  //   // };
  //   // @ts-ignore
  // }, [gameData.game.cooldownTimer, startedTimer, gameData.game.canAttack]);

  if (!gameData) {
    return <p>Loading game...</p>;
  }

  const { game, playerID } = gameData;

  const attackTile = (tile: _Tile) => {
    if (!game.canAttack) return;

    game.attackTile(tile, playerID);
  };

  const selectTile = (tile: _Tile) => {
    setTileInfo(tile);
  };

  const selectArmy = (armyID: string | null) => {
    game.selectArmy(armyID);
    setSelectedArmy(game.getSelectedArmy());
  };

  const selectDeployArmy = (armyID: string | null) => {
    game.selectArmy(armyID);
    setDeployArmy(game.getSelectedArmy());
  };

  const moveArmy = (destination: _Tile) => {
    if (selectedArmy) {
      game.moveArmy(selectedArmy.armyID, destination);
      setSelectedArmy(null);
    }
  };

  const buildCamp = (tile: _Tile) => {
    game.buildCamp(tile, playerID);
  };

  const getPlayer = (playerID: string) => {
    return game.getPlayer(playerID)?.player;
  };

  const trainArmies = (camp: CampType | null, playerID: string | null) => {
    if (!camp || !playerID) return;

    game.trainArmy(camp, playerID);
  };

  const gameMap = game.getMap();

  const armies = game.getArmiesOfPlayer(playerID);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div className="flex">
          <PlayerInfo player={game.getPlayer(playerID)?.player} />
          <p className="font-bold">Cooldown: {game.cooldownTimer}s</p>

          {/* <div className="grow">
            <div
              ref={progressbarRef}
              style={{
                width: "1%",
                height: "32px",
                backgroundColor: "green",
              }}
            ></div>
          </div> */}
        </div>
        <div
          className="map"
          style={{
            width: `${TILE_SIZE * MapManager.MAP_SIZE}px`,
            height: `${TILE_SIZE * MapManager.MAP_SIZE}px`,
          }}
        >
          {gameMap.map((row, rowIndex) => {
            return row.map((tile, x) => {
              const key = x + "" + rowIndex;
              return (
                <Tile
                  key={key}
                  tile={tile}
                  attackTile={attackTile}
                  selectTile={selectTile}
                  getPlayer={getPlayer}
                  selectArmy={selectArmy}
                  moveArmy={moveArmy}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
