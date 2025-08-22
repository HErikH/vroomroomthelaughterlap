import { useEffect, useRef } from "react";
import {
  selectGarageTotalCars,
  selectGarageCurrentPage,
  selectGarageCars,
} from "../../redux/garage/selectors";
import {
  selectIsRaceRunning,
  selectRaceWinner,
  selectFinishedCars
} from "../../redux/race/selectors";
import { fetchCars } from "../../redux/garage/thunks";
import { startAllRaces, resetAllRaces } from "../../redux/race/thunks";
import { CarForm } from "../../components/carForm/CarForm";
import { CarItem } from "../../components/carItem/CarItem";
import { Pagination } from "../../components/ui/pagination/Pagination";
import { WinnerBanner } from "../../components/ui/banner/WinnerBanner";
import { RaceControls } from "../../components/raceControls/RaceControls";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./style.scss";

export function GaragePage() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectGarageCars);
  const totalCars = useAppSelector(selectGarageTotalCars);
  const currentPage = useAppSelector(selectGarageCurrentPage);
  const isRaceRunning = useAppSelector(selectIsRaceRunning);
  const winner = useAppSelector(selectRaceWinner);
  const finishedCars = useAppSelector(selectFinishedCars);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (cars.length > 0) return;

    dispatch(fetchCars());

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [dispatch]);

  const handleStartRace = () => {
    controllerRef.current = new AbortController();

    dispatch(startAllRaces(controllerRef.current));
  };

  const handleResetRace = () => {
    dispatch(resetAllRaces());
  };

  return (
    <div className="garage-view">
      <div className="garage-view__header">
        <h2 className="garage-view__title">Garage ({totalCars || "empty"})</h2>

        <CarForm />

        <RaceControls
          onStart={handleStartRace}
          onReset={handleResetRace}
          isRunning={isRaceRunning}
          finishedCars={finishedCars}
          cars={cars}
        />
      </div>

      <div className="garage-view__cars">
        {cars.map((car) => (
          <CarItem key={car.id} car={car} isRaceRunning={isRaceRunning} finishedCars={finishedCars} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalCars}
        itemsPerPage={7}
        onPageChange={(page) => {
          dispatch(fetchCars(page));
        }}
      />

      {winner && <WinnerBanner winner={winner} />}
    </div>
  );
}
