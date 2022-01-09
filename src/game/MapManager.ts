import { MapType } from "../types/gameTypes";
import { RESOURCES_TYPES } from "./constants";
import Tile from "./Tile";

class MapManager {
  public map: MapType = [];

  public static MAP_SIZE = 12;
  private REGIONS_COUNT = 4;
  private CENTER_SIZE = 2;
  private PLAYER_COUNT = 4;
  // the special resource will be in the center of the map, which allows the player to train new units
  private HAS_SPECIAL_RESOURCE = true;

  constructor(hasSpecialResource: boolean = true) {
    this.initMap();
    this.HAS_SPECIAL_RESOURCE = hasSpecialResource;
  }

  private initMap() {
    if (MapManager.MAP_SIZE / 2 <= this.CENTER_SIZE) {
      console.log("Invalid map size, size can't be = to center size");
      return;
    }

    if (MapManager.MAP_SIZE % 2 !== 0) {
      console.log("Invalid map size, size must be an even number");
      return;
    }

    const MAP_SIZE = MapManager.MAP_SIZE;
    this.map = new Array(MAP_SIZE);

    for (let row = 0; row < MAP_SIZE; row++) {
      this.map[row] = Array.from({ length: MAP_SIZE }, (_, column) => {
        const middle = MAP_SIZE / 2;

        // The center
        if (
          column >= middle - this.CENTER_SIZE &&
          column <= middle + this.CENTER_SIZE - 1 &&
          row >= middle - this.CENTER_SIZE &&
          row <= middle + this.CENTER_SIZE - 1 &&
          this.HAS_SPECIAL_RESOURCE
        ) {
          return new Tile(RESOURCES_TYPES.SPECIAL_RESOURCE, {
            x: column,
            y: row,
          });
        }

        // First region
        if (column < middle && row < middle) {
          return new Tile(RESOURCES_TYPES.FOOD, {
            x: column,
            y: row,
          });
        }

        // Second region
        if (column >= middle && row < middle) {
          return new Tile(RESOURCES_TYPES.STONE, {
            x: column,
            y: row,
          });
        }

        // Third region
        if (column < middle && row >= middle) {
          return new Tile(RESOURCES_TYPES.DIAMOND, {
            x: column,
            y: row,
          });
        }

        // Fourth region
        if (column >= middle && row >= middle) {
          return new Tile(RESOURCES_TYPES.GOLD, {
            x: column,
            y: row,
          });
        }

        // This should not happen
        return new Tile(RESOURCES_TYPES.UNKNOWN, {
          x: column,
          y: row,
        });
      });
    }
  }
}

export default MapManager;
