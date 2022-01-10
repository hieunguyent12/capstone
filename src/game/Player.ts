import { nanoid } from "nanoid";
import { TilePosition } from "./../types/gameTypes";
import Camp from "./Camp";
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
  public camps: Camp[] = [];
  public color: string = "";

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

  public buyCamp(camp: Camp) {
    this.camps.push(camp);

    if (this.resources.FOOD >= Camp.CAMP_COST) {
      this.resources.FOOD -= Camp.CAMP_COST;
    } else {
      console.log("not enough rss to buy camp");
    }
  }

  public setColor(color: string) {
    this.color = color;
  }
}

export default Player;
