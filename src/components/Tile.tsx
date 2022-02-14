import { motion } from "framer-motion";

import { ResourceType } from "../types/gameTypes";
import TileClass from "../game/Tile";
import { RESOURCES_TYPES } from "../game/constants";
import Player from "../game/Player";

interface Props {
  tile: TileClass;
  getPlayer: (playerID: string) => Player | undefined;
  attackTile: (tile: TileClass) => void;
  selectTile: (tile: TileClass) => void;
  selectArmy: (armyID: string) => void;
  moveArmy: (destination: TileClass) => void;
}

function Tile({ tile, attackTile, selectArmy, moveArmy, selectTile, getPlayer }: Props) {
  // TODO change the color to that of the player's
  let color = "";

  switch (tile.resource) {
    case RESOURCES_TYPES.DIAMOND:
      color = "bg-red-400";
      break;
    case RESOURCES_TYPES.STONE:
      color = "bg-blue-400";
      break;
    case RESOURCES_TYPES.FOOD:
      color = "bg-green-400";
      break;
    case RESOURCES_TYPES.GOLD:
      color = "bg-purple-400";
      break;
    case RESOURCES_TYPES.SPECIAL_RESOURCE:
      color = "bg-orange-400";
      break;
  }

  if (tile.playerID) {

    const playerBgColor = getPlayer(tile.playerID)?.color;

    if (tile.isBase) {
      return (
        <div
          className={`tile border-2 relative flex justify-center items-center`}
          style={{
            backgroundColor: playerBgColor,
          }}
          onClick={() => {
            selectTile(tile);
            console.log(tile)
          }}
        >
          <i className="fas fa-star text-yellow-100 baseStar"></i>
        </div>
      );

    }

    if (tile.army) {
      return (
        <div
          className={`tile border-2 relative flex justify-center items-center`}
          style={{
            backgroundColor: playerBgColor,
          }}
          onClick={() => {
            // Select the army
            if (tile.army) {
              selectArmy(tile.army?.armyID);
            }
            selectTile(tile);
          }}
        >
          <i className="fas fa-snowman"></i>
        </div>
      );
    }

    if (tile.camp) {
      return (
        <div
          className={`tile border-2 relative flex justify-center items-center`}
          style={{
            backgroundColor: playerBgColor,
          }}
          onClick={() => {
            selectTile(tile);
          }}
        >
          <i className="fas fa-campground camp text-yellow-600"></i>
          {/* <i className="fas fa-star text-yellow-100 baseStar"></i> */}
        </div>
      );

    }

    if (!tile.isBase) {
      return (
        <div
          className={`tile border-2 relative flex justify-center items-center`}
          style={{
            backgroundColor: playerBgColor,
          }}
          onClick={() => {
            moveArmy(tile);
            selectTile(tile);
          }}
        >
          {/* <i className="fas fa-star text-yellow-100 baseStar"></i> */}
        </div>
      );

    }
  }
  return (
    <div
      className={`tile border-2 relative`}
      onClick={() => {
        attackTile(tile);
        selectTile(tile);
      }}
    >
      <motion.div
        className={`tileRegionIndicator rounded-full w-2 h-2 ${color}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      ></motion.div>
    </div>
  );
}

export default Tile;
