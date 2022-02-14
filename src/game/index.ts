import Army from "./Army";
import Camp from "./Camp";
import { PLAYER_COLORS } from "./constants";
import MapManager from "./MapManager";
import Player from "./Player";
import Tile from "./Tile";

// TODO
// Train army
// Deploy army on tiles
// Army cost
// Move army using some sort of pathfinding algorithm

// This class has all of the game logics
// To start a game, call new Game()

type ListenerCallback = () => void;
type PlayerListObject = {
  [key: string]: {
    player: Player;
  };
};

type BotList = {
  [key: string]: Player;
}

type CampListObject = {
  [key: string]: Camp;
};

type ArmyListObject = {
  [key: string]: Army;
};

class Game {
  private mapManager: MapManager;
  private playerID: string;
  private players: PlayerListObject = {};
  private camps: CampListObject = {};
  private armies: ArmyListObject = {};
  private selectedArmy: Army | null = null;

  private botPlayers: BotList = {};

  public canAttack = true;

  private CAMP_LIMIT = 2;
  private INCOME_AMOUNT = 1;
  public static ATTACK_COOLDOWN_LENGTH = 3000;
  public cooldownTimer = 3;
  public cooldownInterval: any;

  private eventListeners: ListenerCallback[] = [];

  constructor(playerID: string, INCOME_AMOUNT = 1) {
    this.mapManager = new MapManager();
    this.playerID = playerID;
    this.INCOME_AMOUNT = INCOME_AMOUNT;
    this.initPlayers(playerID);
    this.generateIncome();
  }

  private initPlayers(playerID: string) {
    const player = new Player(playerID);

    const bot1 = new Player(undefined, true);

    const tile = this.mapManager.map[0][0];
    const tile2 = this.mapManager.map[this.mapManager.map.length - 1][0];

    bot1.bases.push({
      x: 0,
      y: this.mapManager.map.length - 1,
    })

    bot1.territories.push({
      x: 0,
      y: this.mapManager.map.length - 1
    })

    tile2.playerID = bot1.playerID;
    tile2.isBase = true;
    bot1.setColor(PLAYER_COLORS[1]);
    this.botPlayers[bot1.playerID] = bot1

    player.bases.push({
      x: 0,
      y: 0,
    });
    player.territories.push({
      x: 0,
      y: 0,
    });
    tile.playerID = playerID;
    tile.isBase = true;

    player.setColor(PLAYER_COLORS[0]);

    this.players[playerID] = {
      player,
    };
  }

  private generateIncome() {
    setInterval(() => {
      const map = this.getMap();

      Object.keys(this.players).forEach((playerID) => {
        const playerInfo = this.players[playerID];
        const player = playerInfo.player;

        player.territories.forEach((tilePosition) => {
          const tile = map[tilePosition.y][tilePosition.x];

          player.resources[tile.resourceKey] =
            player.resources[tile.resourceKey] + this.INCOME_AMOUNT;
        });
      });

      this.notifyListeners();
    }, 1000);
  }

  public attackTile(targetTile: Tile, playerID: string) {
    if (!this.canAttack) {
      // console.log("on cooldown");
      return false;
    }

    // console.log("shitttt");
    const playerInfo = this.getPlayer(playerID);

    if (!playerInfo) return null;

    if (this.checkValidAttack(targetTile, playerID)) {
      targetTile.playerID = playerID;
      playerInfo.player.territories.push(targetTile.position);
      // this.canAttack = false;
      // this.attackCooldown();
      this.notifyListeners();
      return true;
    } else {
      console.log("can't attack that tile");
      return false;
    }
  }

  public attackCooldown() {
    this.cooldownTimer--;
    this.cooldownInterval = setInterval(() => {
      if (this.cooldownTimer === 0) {
        this.cooldownTimer = 3;
        clearInterval(this.cooldownInterval);
        this.canAttack = true;
        return;
      }

      this.cooldownTimer--;
    }, 1000);
  }

  public buildCamp(targetTile: Tile, playerID: string) {
    const playerInfo = this.getPlayer(playerID);


    if (!playerInfo) return null;

    if (!targetTile.canBuildCamp(playerID)) {
      console.log("can't build camp there");
      return;
    }

    if (playerInfo.player.camps.length >= this.CAMP_LIMIT) {
      console.log(`can't build more than ${this.CAMP_LIMIT} camps`);
      return;
    }

    const camp = new Camp(playerID, targetTile.position);

    playerInfo.player.buyCamp(camp);

    targetTile.buildCamp(camp);

    this.camps[camp.campID] = camp;

    this.notifyListeners();
  }

  public deployArmy(armyID: string, tile: Tile) {

  }
  public trainArmy(camp: Camp | null, playerID: string | null) {
    if (!camp || !playerID) return;

    const player = this.getPlayer(playerID)?.player;

    if (!player) return null;
    const army = camp.trainArmy();
    player.addArmyToList(army);

    this.armies[army.armyID] = army;
  }
  // select army to deploy
  public selectArmy(armyID: string | null) {
    if (armyID === null) {
      this.selectedArmy = null;
      return;
    }
    const army = this.armies[armyID];

    if (!army) {
      console.log('the selected army does not exist');
      return;
    }

    this.selectedArmy = army;
  }

  public moveArmy(armyID: string, destination: Tile) {
    const army = this.armies[armyID];

    if (!army || !army?.tilePosition) {
      return;
    }

    if (destination.playerID === army.playerID) {
      if (!destination.isEmpty && !destination.army) return;
    }

    const map = this.getMap();

    map[army.tilePosition?.y][army.tilePosition?.x].army = null;

    army.tilePosition = destination.position;
    destination.army = army;
  }

  public getSelectedArmy() {
    return this.selectedArmy;
  }

  private checkValidAttack(tile: Tile, playerID: string) {
    const map = this.getMap();
    const MAP_SIZE = MapManager.MAP_SIZE;

    const { x, y } = tile.position;

    // check if the tile is adjacent to a friendly tile
    const north = y - 1;
    const south = y + 1;
    const east = x + 1;
    const west = x - 1;

    if (north >= 0 && north < MAP_SIZE) {
      const northTile = map[y - 1][x];

      if (northTile.playerID === playerID) {
        return true;
      }
    }

    if (south >= 0 && south < MAP_SIZE) {
      const southTile = map[y + 1][x];

      if (southTile.playerID === playerID) {
        return true;
      }
    }

    if (east >= 0 && east < MAP_SIZE) {
      const eastTile = map[y][east];

      if (eastTile.playerID === playerID) {
        return true;
      }
    }

    if (west >= 0 && west < MAP_SIZE) {
      const westTile = map[y][west];

      if (westTile.playerID === playerID) {
        return true;
      }
    }

    return false;
  }

  public getArmiesOfPlayer(playerID: string) {
    if (!playerID) return [];

    let armies: Army[] = [];

    for (const armyID of Object.keys(this.armies)) {
      const army = this.armies[armyID];

      if (army.playerID === playerID) {
        armies.push(army);
      }
    }

    return armies;
  }

  public getMap() {
    return this.mapManager.map;
  }

  public getCamp(campID: string) {
    return this.camps[campID];
  }

  public getTile() { }

  public getPlayer(playerID: string) {
    let player = this.players[playerID];
    if (player) return player;
    else {
      player = {
        player: this.botPlayers[playerID]
      }
      if (player) return player;

      return null;
    }
  }

  public listenForEvents(cb: ListenerCallback) {
    this.eventListeners.push(cb);

    return () => {
      this.eventListeners = this.eventListeners.filter((_cb) => _cb !== cb);
    };
  }

  private notifyListeners() {
    this.eventListeners.forEach((cb) => cb());
  }
}

export default Game;
