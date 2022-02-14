import Army from "../game/Army";
import Camp from "./Camp";
interface Props {
  armies: Army[];
  selectArmy: (armyID: string) => void;
}
function Armies({ armies, selectArmy }: Props) {
  return (
    <div>
      <p>Player Armies: </p>
      {armies.map((army) => (
        <ArmyComp key={army.armyID} selectArmy={selectArmy} army={army} />
      ))}
    </div>
  );
}

interface ArmyCompProps {
  army: Army;
  selectArmy: Props["selectArmy"];
}

function ArmyComp({ army, selectArmy }: ArmyCompProps) {
  return (
    <div>
      <p>{army.armyID}</p>
      <button
        style={{
          border: "1px solid black",
        }}
        onClick={() => selectArmy(army.armyID)}
      >
        Select army
      </button>
    </div>
  );
}

export default Armies;
