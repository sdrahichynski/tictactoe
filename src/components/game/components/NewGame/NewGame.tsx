import * as React from "react";
import { Player } from "../../../controller";

interface NewGameProps {
  onStart(players: Player[]): void;
}

const NewGame: React.FC<NewGameProps> = ({ onStart }) => {
  const [ hasError, setHasError ] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const players = new Array(2)
      .fill(null)
      .map((_, index) => ({ name: String(formData.get(`player-${index}`)) || "", id: index.toString(), sign: index ? "🌙" : "☀️" }));

      if (!players.every(p => p.name)) {
        setHasError(true);
        return;
      }

      onStart(players);
  };

  const removeError = () => {
    setHasError(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center p-8"
    >
      {new Array(2).fill(null).map((_, i) => (
        <label key={`player-${i + 1}`}>
          <span className="mr-4">Player {i + 1}:</span>
          <input
            type="text"
            name={`player-${i}`}
            onFocus={removeError}
            className="border-2 border-sky-600 rounded-md p-2"
          />
        </label>
      ))}

      { hasError && <p className="font-bold text-rose-500">Check players names</p> }
      {/* <button onClick={() => setPlayersCount(prev => prev + 1)}>+</button> */}

      <button>Start</button>
    </form>
  );
};

export default NewGame;
