import type {
  T_AddCar,
  T_ClearCreateForm,
  T_ClearEditForm,
  T_DeleteCar,
  T_GenerateCars,
  T_SetCarPosition,
  T_SetCars,
  T_SetCreating,
  T_SetCurrentPage,
  T_SetEditingCar,
  T_SetSelectedCar,
  T_SetTotalCars,
  T_UpdateCar,
  T_UpdateCreateForm,
  T_UpdateEditForm,
} from "./types";
import { GARAGE_ACTION_TYPES } from "./actionTypes";

export const setCars = (cars: T_SetCars["payload"]): T_SetCars => ({
  type: GARAGE_ACTION_TYPES.SET_CARS,
  payload: cars,
});

export const addCar = (car: T_AddCar["payload"]): T_AddCar => ({
  type: GARAGE_ACTION_TYPES.ADD_CAR,
  payload: car,
});

export const updateCar = (car: T_UpdateCar["payload"]): T_UpdateCar => ({
  type: GARAGE_ACTION_TYPES.UPDATE_CAR,
  payload: car,
});

export const deleteCar = (carId: T_DeleteCar["payload"]): T_DeleteCar => ({
  type: GARAGE_ACTION_TYPES.DELETE_CAR,
  payload: carId,
});

export const setCurrentPage = (
  page: T_SetCurrentPage["payload"]
): T_SetCurrentPage => ({
  type: GARAGE_ACTION_TYPES.SET_CURRENT_PAGE,
  payload: page,
});

export const setSelectedCar = (
  carId: T_SetSelectedCar["payload"]
): T_SetSelectedCar => ({
  type: GARAGE_ACTION_TYPES.SET_SELECTED_CAR,
  payload: carId,
});

export const setEditingCar = (
  car: T_SetEditingCar["payload"]
): T_SetEditingCar => ({
  type: GARAGE_ACTION_TYPES.SET_EDITING_CAR,
  payload: car,
});

export const setCreating = (
  isCreating: T_SetCreating["payload"]
): T_SetCreating => ({
  type: GARAGE_ACTION_TYPES.SET_CREATING,
  payload: isCreating,
});

export const setTotalCars = (
  total: T_SetTotalCars["payload"]
): T_SetTotalCars => ({
  type: GARAGE_ACTION_TYPES.SET_TOTAL_CARS,
  payload: total,
});

export const generateCars = (
  cars: T_GenerateCars["payload"]
): T_GenerateCars => ({
  type: GARAGE_ACTION_TYPES.GENERATE_CARS,
  payload: cars,
});

export const setCarPosition = (
  car: T_SetCarPosition["payload"]
): T_SetCarPosition => ({
  type: GARAGE_ACTION_TYPES.SET_CAR_POSITION,
  payload: car,
});

export const updateCreateForm = (
  formData: T_UpdateCreateForm["payload"]
): T_UpdateCreateForm => ({
  type: GARAGE_ACTION_TYPES.UPDATE_CREATE_FORM,
  payload: formData,
});

export const updateEditForm = (
  formData: T_UpdateEditForm["payload"]
): T_UpdateEditForm => ({
  type: GARAGE_ACTION_TYPES.UPDATE_EDIT_FORM,
  payload: formData,
});

export const clearCreateForm = (): T_ClearCreateForm => ({
  type: GARAGE_ACTION_TYPES.CLEAR_CREATE_FORM,
});

export const clearEditForm = (): T_ClearEditForm => ({
  type: GARAGE_ACTION_TYPES.CLEAR_EDIT_FORM,
});
