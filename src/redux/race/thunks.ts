import type { T_RootState, T_Dispatch } from "../../store/store";
import axios from "axios";
import {
  startRace,
  finishRace,
  resetRace,
  setWinner,
  carFinished,
} from "./actionCreators";
import { addWinnerThunk } from "../winners/thunks";
import {
  animateCar,
  getVisibleCars,
  stopAnimateCar,
} from "../../helpers/functions/thunksUtils";

const API_BASE: string = import.meta.env.VITE_API_BASE;

export const startSingleRace = (carId: number, controller: AbortController) => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    const startTime = Date.now();

    dispatch(startRace());

    try {
      // Get car velocity and distance
      const startResponse = await axios.patch(
        `${API_BASE}/engine?id=${carId}&status=started`,
        {},
        { signal: controller.signal }
      );
      const { velocity, distance } = startResponse.data;

      // Start animation
      const animationPromise = animateCar(carId, velocity, distance, dispatch);

      // Start drive request
      const drivePromise = axios.patch(
        `${API_BASE}/engine?id=${carId}&status=drive`,
        {},
        { signal: controller.signal }
      );

      const [, driveResponse] = await Promise.all([
        animationPromise,
        drivePromise,
      ]);

      const endTime = Date.now();
      const raceTime = (endTime - startTime) / 1000;
      const car = getState().garage.cars.find((c) => c.id === carId);

      if (driveResponse.data.success && car) {
        dispatch(carFinished(carId));
        dispatch(setWinner(car));
        dispatch(addWinnerThunk(carId, raceTime));
      }
    } catch (error) {
      console.error("Car engine failed:", error);

      // Stop animation if drive fails
      stopAnimateCar(carId, undefined, dispatch);
    } finally {
      dispatch(finishRace());
    }
  };
};

export const stopSingleRace = (carId: number) => {
  return async (dispatch: T_Dispatch) => {
    try {
      // Stop animation
      stopAnimateCar(carId, undefined, dispatch);

      await axios.patch(`${API_BASE}/engine?id=${carId}&status=stopped`);
    } catch (error) {
      console.error("Failed to stop car:", error);
    }
  };
};

export const startAllRaces = (controller: AbortController) => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    const state = getState();
    const visibleCars = getVisibleCars(state);

    dispatch(startRace());

    const racePromises = visibleCars.map(async (car) => {
      const startTime = Date.now();

      try {
        // Get car velocity and distance
        const startResponse = await axios.patch(
          `${API_BASE}/engine?id=${car.id}&status=started`,
          {},
          { signal: controller.signal }
        );
        const { velocity, distance } = startResponse.data;

        // Start animation
        const animationPromise = animateCar(
          car.id,
          velocity,
          distance,
          dispatch
        );

        // Start drive request
        const drivePromise = axios.patch(
          `${API_BASE}/engine?id=${car.id}&status=drive`,
          {},
          { signal: controller.signal }
        );

        const [, driveResponse] = await Promise.all([
          animationPromise,
          drivePromise,
        ]);

        const endTime = Date.now();
        const raceTime = (endTime - startTime) / 1000;

        if (driveResponse.data.success) {
          dispatch(carFinished(car.id));
          return { car, time: raceTime };
        }

        return null;
      } catch (error) {
        // Stop animation if drive fails
        stopAnimateCar(car.id, undefined, dispatch);
        return null;
      }
    });

    const results = await Promise.allSettled(racePromises);
    const finishedRaces = results
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{
          car: any;
          time: number;
        } | null> => result.status === "fulfilled" && result.value !== null
      )
      .map((result) => result.value!);

    // Find the first car to finish (winner)
    if (finishedRaces.length > 0) {
      const winner = finishedRaces.sort((a, b) => a.time - b.time)[0];
      dispatch(setWinner(winner.car));
      dispatch(addWinnerThunk(winner.car.id, winner.time));
    }

    dispatch(finishRace());
  };
};

export const resetAllRaces = () => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    const state = getState();
    const visibleCars = getVisibleCars(state);

    try {
      // Reset all car positions
      visibleCars.forEach((car) => {
        stopAnimateCar(car.id, 0, dispatch);
      });

      dispatch(resetRace());

      await Promise.all(
        visibleCars.map((car) =>
          axios.patch(`${API_BASE}/engine?id=${car.id}&status=stopped`)
        )
      );
    } catch (error) {
      console.error("Failed to reset races:", error);
    }
  };
};
