import { nanoid } from "nanoid";

import { TilePosition } from '../types/gameTypes'

class Army {
  public count = 1;
  public playerID: string;
  public armyID: string;
  public isDeployed: boolean = false;
  public tilePosition: TilePosition | null = null;

  public static ARMY_COST = 1;

  constructor(playerID: string, tilePosition: TilePosition | null) {
    this.playerID = playerID;
    this.armyID = nanoid();
    this.tilePosition = tilePosition;
  }

  public deploy() {
    this.isDeployed = true;
  }
}

export default Army;
