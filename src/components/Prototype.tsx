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

const TILE_SIZE = 50;

export default function Prototype() {
  const [tileInfo, setTileInfo] = useState<_Tile | null>(null);
  const gameData = useGame();

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

  const buildCamp = (tile: _Tile) => {
    game.buildCamp(tile, playerID);
  };

  const getPlayer = (playerID: string) => {
    // console.log(game.getPlayer(playerID).player);
    return game.getPlayer(playerID).player;
  };

  const trainArmies = () => {
    console.log("hi");
  };

  const deployArmies = () => {};

  const gameMap = game.getMap();

  return (
    <div>
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
              />
            );
          });
        })}
      </div>
      <p>Cooldown: {game.cooldownTimer}s</p>
      <PlayerInfo player={game.getPlayer(playerID).player} />
      <TileInfo
        tileInfo={tileInfo}
        buildCamp={buildCamp}
        trainArmies={trainArmies}
        deployArmies={deployArmies}
      />
    </div>
  );
}
