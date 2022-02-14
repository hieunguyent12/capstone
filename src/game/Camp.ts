import { nanoid } from "nanoid";
import { TilePosition } from "../types/gameTypes";
import Army from "./Army";

class Camp {
  public campID: string;
  public position: TilePosition;
  public playerID: string;
  public trainingArmies: Army[] = [];
  public deployableArmies: Army[] = [];

  public static CAMP_COST = 2;

  constructor(playerID: string, position: TilePosition) {
    this.playerID = playerID;
    this.position = position;
    this.campID = nanoid();
  }
  // TODO when army is finished training, push it to deployableArmies array
  public trainArmy() {
    const army = new Army(this.playerID, null);
    this.trainingArmies.push(army);
    this.deployableArmies.push(army); // NOTE remove this later, only for testing
    return army;
  }
}

export default Camp;
