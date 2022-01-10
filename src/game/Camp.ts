import { TilePosition } from "../types/gameTypes";
import Army from "./Army";

class Camp {
  public position: TilePosition;
  public playerID: string;
  public trainingArmies: Army[] = [];

  public static CAMP_COST = 2;

  constructor(playerID: string, position: TilePosition) {
    this.playerID = playerID;
    this.position = position;
  }

  public trainArmy() {
    this.trainingArmies.push(new Army());
  }
}

export default Camp;
