import type { T_GarageState, T_GarageActions } from './types';
import { GARAGE_ACTION_TYPES } from './actionTypes';

const initialState: T_GarageState = {
  cars: [],
  currentPage: 1,
  totalCars: 0,
  selectedCarId: null,
  editingCar: null,
  isCreating: false
};

export const garageReducer = (state = initialState, action: T_GarageActions): T_GarageState => {
  switch (action.type) {
    case GARAGE_ACTION_TYPES.SET_CARS:
      return {
        ...state,
        cars: action.payload
      };
    
    case GARAGE_ACTION_TYPES.ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload],
        totalCars: state.totalCars + 1
      };
    
    case GARAGE_ACTION_TYPES.UPDATE_CAR:
      return {
        ...state,
        cars: state.cars.map(car => 
          car.id === action.payload.id ? action.payload : car
        )
      };
    
    case GARAGE_ACTION_TYPES.DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter(car => car.id !== action.payload),
        totalCars: state.totalCars - 1,
        selectedCarId: state.selectedCarId === action.payload ? null : state.selectedCarId
      };
    
    case GARAGE_ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    case GARAGE_ACTION_TYPES.SET_SELECTED_CAR:
      return {
        ...state,
        selectedCarId: action.payload
      };
    
    case GARAGE_ACTION_TYPES.SET_EDITING_CAR:
      return {
        ...state,
        editingCar: action.payload
      };
    
    case GARAGE_ACTION_TYPES.SET_CREATING:
      return {
        ...state,
        isCreating: action.payload
      };
    
    case GARAGE_ACTION_TYPES.SET_TOTAL_CARS:
      return {
        ...state,
        totalCars: action.payload
      };
    
    case GARAGE_ACTION_TYPES.GENERATE_CARS:
      return {
        ...state,
        cars: [...state.cars, ...action.payload],
        totalCars: state.totalCars + action.payload.length
      };
    
    default:
      return state;
  }
};