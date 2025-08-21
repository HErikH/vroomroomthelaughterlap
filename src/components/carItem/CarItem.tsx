import { useAppDispatch } from "../../store/hooks";
import type { T_Car } from "../../redux/garage/types";
import { removeCar } from "../../redux/garage/thunks";
import { startSingleRace, stopSingleRace } from "../../redux/race/thunks";
import { setEditingCar } from "../../redux/garage/actionCreators";
import "./style.scss";
import { useEffect, useRef } from "react";

type T_CarItemProps = {
  car: T_Car;
  isRaceRunning: boolean;
  finishedCars: number[];
};

export function CarItem({ car, isRaceRunning, finishedCars }: T_CarItemProps) {
  const dispatch = useAppDispatch();
  const controllerRef = useRef<AbortController | null>(null);

  const handleEdit = () => {
    dispatch(setEditingCar(car));
  };

  const handleDelete = () => {
    if (isRaceRunning) {
      alert("Cannot delete car during race");
      return;
    }

    dispatch(removeCar(car.id));
  };

  const handleStartRace = () => {
    controllerRef.current = new AbortController();

    dispatch(startSingleRace(car.id, controllerRef.current));
  };

  const handleStopRace = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    dispatch(stopSingleRace(car.id));
  };

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="car-item" data-car-id={car.id}>
      <div className="car-item__controls">
        <button
          className="btn btn--small btn--secondary"
          onClick={handleEdit}
          disabled={isRaceRunning}
        >
          Edit
        </button>
        <button
          className="btn btn--small btn--danger"
          onClick={handleDelete}
          disabled={isRaceRunning}
        >
          Delete
        </button>
      </div>

      <div className="car-item__info">
        <h3 className="car-item__name">{car.name}</h3>
      </div>

      <div className="car-item__track">
        <div className="car-item__race-controls">
          <button
            className="btn btn--small btn--success"
            onClick={handleStartRace}
            disabled={isRaceRunning || finishedCars.includes(car.id)}
          >
            A
          </button>
          <button
            className="btn btn--small btn--warning"
            onClick={handleStopRace}
            disabled={!isRaceRunning}
          >
            B
          </button>
        </div>

        <div className="car-track">
          <div className="car-track__road">
            <div
              className="car-track__car"
              style={{
                backgroundColor: car.color,
                left: (car.position || 0) + "px",
              }}
            >
              🏎️
            </div>
          </div>
          <div className="car-track__finish">🏁</div>
        </div>
      </div>
    </div>
  );
}
