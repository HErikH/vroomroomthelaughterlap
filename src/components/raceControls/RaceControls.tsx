import type { T_Car } from "../../redux/garage/types";
import "./style.scss";

type T_RaceControlsProps = {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
  finishedCars: number[];
  cars: T_Car[];
}

export function RaceControls({
  onStart,
  onReset,
  isRunning,
  finishedCars,
  cars
}: T_RaceControlsProps) {
  const isDisabled = isRunning || cars.length < 1;

  return (
    <div className="race-controls">
      <button 
        className="btn btn--large btn--success"
        onClick={onStart}
        disabled={isDisabled || finishedCars.length > 0}
      >
        Race
      </button>
      
      <button 
        className="btn btn--large btn--warning"
        onClick={onReset}
        disabled={isDisabled}
      >
        Reset
      </button>
    </div>
  );
};
