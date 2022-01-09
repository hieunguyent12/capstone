import { ResourceType } from "../types/gameTypes";
import { TilePosition } from "./../types/gameTypes";
import { RESOURCES_TYPES } from "./constants";

type RESOURCES_KEYS = keyof typeof RESOURCES_TYPES;

class Tile {
  public resource: ResourceType;
  public resourceKey!: RESOURCES_KEYS;
  public playerID: string | null = null;
  public isBase = false;
  public position: TilePosition;

  constructor(resource: ResourceType, position: TilePosition) {
    this.resource = resource;
    this.position = position;

    Object.keys(RESOURCES_TYPES).forEach((type) => {
      if (RESOURCES_TYPES[type as RESOURCES_KEYS] === resource) {
        this.resourceKey = type as RESOURCES_KEYS;
      }
    });
  }

  public isEmpty() {
    return !this.playerID && !this.isBase;
  }
}

export default Tile;
