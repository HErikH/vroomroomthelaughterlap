import "./style.scss";

type T_RaceControlsProps = {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
  finishedCars: number[];
}

export function RaceControls({
  onStart,
  onReset,
  isRunning,
  finishedCars
}: T_RaceControlsProps) {
  return (
    <div className="race-controls">
      <button 
        className="btn btn--large btn--success"
        onClick={onStart}
        disabled={isRunning || finishedCars.length > 0}
      >
        Race
      </button>
      
      <button 
        className="btn btn--large btn--warning"
        onClick={onReset}
        disabled={isRunning}
      >
        Reset
      </button>
    </div>
  );
};
