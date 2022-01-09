import { useEffect, useRef, useState } from "react";

import { useGame } from "../context/GameData";
import MapManager from "../game/MapManager";
import Tile from "./Tile";
import { TilePosition } from "../types/gameTypes";
import _Tile from "../game/Tile";
import Game from "../game";
import PlayerInfo from "./PlayerInfo";

export default function Prototype() {
  const gameData = useGame();

  if (!gameData) {
    return <p>Loading game...</p>;
  }

  const { game, playerID } = gameData;

  const attackTile = (tile: _Tile) => {
    if (!game.canAttack) return;

    game.attackTile(tile, playerID);
  };

  const gameMap = game.getMap();

  return (
    <div>
      <div
        className="map"
        style={{
          width: `${50 * MapManager.MAP_SIZE}px`,
          height: `${50 * MapManager.MAP_SIZE}px`,
        }}
      >
        {gameMap.map((row, rowIndex) => {
          return row.map((tile, x) => {
            const key = x + "" + rowIndex;
            return <Tile key={key} tile={tile} attackTile={attackTile} />;
          });
        })}
      </div>
      <p>Cooldown: {game.cooldownTimer}s</p>
      <PlayerInfo player={game.getPlayer(playerID).player} />
    </div>
  );
}
