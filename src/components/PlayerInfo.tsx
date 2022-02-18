import Player from "../game/Player";

interface Props {
  player: Player | undefined;
}

function PlayerInfo({ player }: Props) {
  if (!player) return null;
  const { FOOD, STONE, DIAMOND, GOLD, SPECIAL_RESOURCE } = player.resources;
  return (
    <div className="flex mb-2">
      <p>
        <span className="mr-1">
          <i className="fa-solid fa-burger"></i>
        </span>
        {FOOD}
      </p>
      <p className="mx-4">
        {" "}
        <span className="mr-1">
          <i className="fa-solid fa-meteor"></i>{" "}
        </span>{" "}
        {STONE}
      </p>
      <p className="  mx-4">
        <span className="mr-1">
          <i className="fa-solid fa-gem"></i>{" "}
        </span>
        {DIAMOND}
      </p>
      <p className="mx-4">
        {" "}
        <span className="mr-1">
          <i className="fa-solid fa-fire"></i>{" "}
        </span>{" "}
        {GOLD}
      </p>
      {/* <p>SPECIAL RESOURCE: {SPECIAL_RESOURCE}</p> */}
    </div>
  );
}

export default PlayerInfo;
