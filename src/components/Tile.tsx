import { motion } from "framer-motion";

import { ResourceType } from "../types/gameTypes";
import TileClass from "../game/Tile";
import { RESOURCES_TYPES } from "../game/constants";

interface Props {
  tile: TileClass;
  attackTile: (tile: TileClass) => void;
}

function Tile({ tile, attackTile }: Props) {
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

  if (tile.playerID && tile.isBase) {
    return (
      <div
        className={`tile border-2 relative ${color} flex justify-center items-center`}
        onClick={() => console.log(tile)}
      >
        <i className="fas fa-star text-yellow-100 baseStar"></i>
      </div>
    );
  }

  if (tile.playerID && !tile.isBase) {
    return (
      <div
        className={`tile border-2 relative ${color} flex justify-center items-center`}
        onClick={() => console.log(tile)}
      >
        {/* <i className="fas fa-star text-yellow-100 baseStar"></i> */}
      </div>
    );
  }

  return (
    <div className={`tile border-2 relative`} onClick={() => attackTile(tile)}>
      <motion.div
        className={`tileRegionIndicator rounded-full w-2 h-2 ${color}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      ></motion.div>
    </div>
  );
}

export default Tile;
