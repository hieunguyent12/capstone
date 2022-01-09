import { nanoid } from "nanoid";
import { TilePosition } from "./../types/gameTypes";
import { RESOURCES_TYPES } from "./constants";

type Resources = {
  -readonly [Property in keyof typeof RESOURCES_TYPES]: number;
};

class Player {
  public playerID: string;
  public resources: Resources;
  public armies = [];
  public territories: TilePosition[] = [];
  public bases: TilePosition[] = [];

  constructor(playerID?: string) {
    this.playerID = playerID ? playerID : nanoid();
    this.resources = Object.keys(RESOURCES_TYPES).reduce(
      (prev: any, curr: string) => {
        prev[curr] = 0;

        return prev;
      },
      {}
    );
  }
}

export default Player;
