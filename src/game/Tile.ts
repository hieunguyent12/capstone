import { ResourceType } from "../types/gameTypes";
import { TilePosition } from "./../types/gameTypes";
import Camp from "./Camp";
import { RESOURCES_TYPES } from "./constants";

type RESOURCES_KEYS = keyof typeof RESOURCES_TYPES;

class Tile {
  public resource: ResourceType;
  public resourceKey!: RESOURCES_KEYS;
  public playerID: string | null = null;
  public isBase = false;
  public position: TilePosition;
  public army = null;
  public camp: Camp | null = null;

  constructor(resource: ResourceType, position: TilePosition) {
    this.resource = resource;
    this.position = position;

    Object.keys(RESOURCES_TYPES).forEach((type) => {
      if (RESOURCES_TYPES[type as RESOURCES_KEYS] === resource) {
        this.resourceKey = type as RESOURCES_KEYS;
      }
    });
  }

  public buildCamp(camp: Camp) {
    this.camp = camp;
  }

  public canBuildCamp(playerID: string) {
    return (
      this.playerID === playerID && !this.isBase && !this.army && !this.camp
    );
  }

  public isEmpty() {
    return !this.playerID && !this.isBase && !this.army && !this.camp;
  }
}

export default Tile;
