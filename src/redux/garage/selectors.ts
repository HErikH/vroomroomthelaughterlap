import type { T_RootState } from '../../store/store';

export const selectGarageCars = (state: T_RootState) => state.garage.cars;
export const selectGarageCurrentPage = (state: T_RootState) => state.garage.currentPage;
export const selectGarageTotalCars = (state: T_RootState) => state.garage.totalCars;
export const selectSelectedCarId = (state: T_RootState) => state.garage.selectedCarId;
export const selectEditingCar = (state: T_RootState) => state.garage.editingCar;
export const selectIsCreating = (state: T_RootState) => state.garage.isCreating;

export const selectSelectedCar = (state: T_RootState) => {
  const selectedId = selectSelectedCarId(state);
  return selectedId ? state.garage.cars.find(car => car.id === selectedId) : null;
};

export const selectPaginatedCars = (state: T_RootState) => {
  const cars = selectGarageCars(state);
  const currentPage = selectGarageCurrentPage(state);
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return cars.slice(startIndex, startIndex + itemsPerPage);
};