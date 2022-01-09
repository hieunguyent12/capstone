import Player from "../game/Player";

interface Props {
  player: Player;
}

function PlayerInfo({ player }: Props) {
  const { FOOD, STONE, DIAMOND, GOLD, SPECIAL_RESOURCE } = player.resources;
  return (
    <div>
      <p>Food: {FOOD}</p>
      <p>Stone: {STONE}</p>
      <p>DIAMOND: {DIAMOND}</p>
      <p>GOLD: {GOLD}</p>
      <p>SPECIAL RESOURCE: {SPECIAL_RESOURCE}</p>
    </div>
  );
}

export default PlayerInfo;
