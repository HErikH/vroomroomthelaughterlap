// src/store/selectors/raceSelectors.ts
import type { T_RootState } from '../../store/store';

export const selectIsRaceRunning = (state: T_RootState) => state.race.isRunning;
export const selectRaceWinner = (state: T_RootState) => state.race.winner;
export const selectFinishedCars = (state: T_RootState) => state.race.finishedCars;