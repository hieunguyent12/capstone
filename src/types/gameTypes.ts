import { RESOURCES_TYPES } from "../game/constants";
import Tile from "../game/Tile";

// The map is represented by a 2 dimensional array
// Each element array represents a region of the map
export type MapType = Tile[][];

export type ResourceType = typeof RESOURCES_TYPES[keyof typeof RESOURCES_TYPES];

export type TilePosition = {
  x: number;
  y: number;
};
