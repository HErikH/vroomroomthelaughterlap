import type { GARAGE_ACTION_TYPES } from "./actionTypes";

export type T_Car = {
  id: number;
  name: string;
  color: string;
};

export type T_GarageState = {
  cars: T_Car[];
  currentPage: number;
  totalCars: number;
  selectedCarId: number | null;
  editingCar: T_Car | null;
  isCreating: boolean;
};

export type T_SetCars = {
  type: typeof GARAGE_ACTION_TYPES.SET_CARS;
  payload: T_Car[];
};

export type T_AddCar = {
  type: typeof GARAGE_ACTION_TYPES.ADD_CAR;
  payload: T_Car;
};

export type T_UpdateCar = {
  type: typeof GARAGE_ACTION_TYPES.UPDATE_CAR;
  payload: T_Car;
};

export type T_DeleteCar = {
  type: typeof GARAGE_ACTION_TYPES.DELETE_CAR;
  payload: number;
};

export type T_SetCurrentPage = {
  type: typeof GARAGE_ACTION_TYPES.SET_CURRENT_PAGE;
  payload: number;
};

export type T_SetSelectedCar = {
  type: typeof GARAGE_ACTION_TYPES.SET_SELECTED_CAR;
  payload: number | null;
};

export type T_SetEditingCar = {
  type: typeof GARAGE_ACTION_TYPES.SET_EDITING_CAR;
  payload: T_Car | null;
};

export type T_SetCreating = {
  type: typeof GARAGE_ACTION_TYPES.SET_CREATING;
  payload: boolean;
};

export type T_SetTotalCars = {
  type: typeof GARAGE_ACTION_TYPES.SET_TOTAL_CARS;
  payload: number;
};

export type T_GenerateCars = {
  type: typeof GARAGE_ACTION_TYPES.GENERATE_CARS;
  payload: T_Car[];
};

export type T_GarageActions =
  | T_SetCars
  | T_AddCar
  | T_UpdateCar
  | T_DeleteCar
  | T_SetCurrentPage
  | T_SetSelectedCar
  | T_SetEditingCar
  | T_SetCreating
  | T_SetTotalCars
  | T_GenerateCars;
