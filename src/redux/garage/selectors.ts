import type { T_RootState } from '../../store/store';
import type { T_Car } from './types';

export const selectGarageCars = (state: T_RootState) => state.garage.cars;
export const selectGarageCurrentPage = (state: T_RootState) => state.garage.currentPage;
export const selectGarageTotalCars = (state: T_RootState) => state.garage.totalCars;
export const selectSelectedCarId = (state: T_RootState) => state.garage.selectedCarId;
export const selectEditingCar = (state: T_RootState) => state.garage.editingCar;
export const selectIsCreating = (state: T_RootState) => state.garage.isCreating;
export const selectCreateFormState = (state: T_RootState) => state.garage.formState.createForm;
export const selectEditFormState = (state: T_RootState) => state.garage.formState.editForm;

export const selectCarPosition = (carId: T_Car["id"]) => (state: T_RootState) => {
  const cars = selectGarageCars(state);

  return cars.find((car) => car.id === carId);
};

export const selectSelectedCar = (state: T_RootState) => {
  const selectedId = selectSelectedCarId(state);

  return selectedId ? state.garage.cars.find(car => car.id === selectedId) : null;
};