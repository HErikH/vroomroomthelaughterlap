import { combineReducers } from 'redux';
import { garageReducer } from './garage/reducer';
import { winnersReducer } from './winners/reducer';
import { raceReducer } from './race/reducer';

export const rootReducer = combineReducers({
  garage: garageReducer,
  winners: winnersReducer,
  race: raceReducer,
});