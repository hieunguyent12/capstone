interface Props {
  trainArmies: () => void;
  deployArmies: () => void;
}

function Camp({ trainArmies, deployArmies }: Props) {
  return (
    <div>
      <button className="bg-orange-200" onClick={trainArmies}>
        Train Armies
      </button>
      <button className="bg-orange-200 ml-5" onClick={deployArmies}>
        Deploy Armies
      </button>
    </div>
  );
}

export default Camp;
