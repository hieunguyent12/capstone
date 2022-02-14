interface Props {
  trainArmies: () => void;
}

function Camp({ trainArmies, }: Props) {
  return (
    <div>
      <button className="bg-orange-200" onClick={trainArmies}>
        Train Armies
      </button>
    </div>
  );
}

export default Camp;
