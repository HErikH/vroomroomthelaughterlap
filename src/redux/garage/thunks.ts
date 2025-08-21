import type { T_Dispatch, T_RootState } from "../../store/store";
import axios from "axios";
import type { T_Car } from "./types";
import {
  setCars,
  addCar,
  updateCar,
  deleteCar,
  setTotalCars,
  generateCars,
  setCurrentPage,
} from "./actionCreators";
import { CAR_BRANDS, CAR_COLORS, CAR_MODELS } from "./constants";

const API_BASE: string = import.meta.env.VITE_API_BASE;

export const fetchCars = (page: number = 1, limit: number = 7) => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    try {
      const state = getState();
      const currentPage = page || state.garage.currentPage;

      const response = await axios.get(
        `${API_BASE}/garage?_page=${currentPage}&_limit=${limit}`
      );
      const totalCount = parseInt(response.headers["x-total-count"] || "0");

      dispatch(setCars(response.data));
      dispatch(setTotalCars(totalCount));

      if (page) {
        dispatch(setCurrentPage(page));
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };
};

export const createCar = (car: Omit<T_Car, "id">) => {
  return async (dispatch: T_Dispatch) => {
    try {
      const response = await axios.post(`${API_BASE}/garage`, car);

      dispatch(addCar(response.data));
    } catch (error) {
      console.error("Failed to create car:", error);
    }
  };
};

export const editCar = (id: number, car: Partial<T_Car>) => {
  return async (dispatch: T_Dispatch) => {
    try {
      const response = await axios.put(`${API_BASE}/garage/${id}`, car);

      dispatch(updateCar(response.data));
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };
};

export const removeCar = (id: number) => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    try {
      await axios.delete(`${API_BASE}/garage/${id}`);

      dispatch(deleteCar(id));

      const state = getState();
      const currentPage = state.garage.currentPage;
      const totalCars = state.garage.totalCars - 1;
      const itemsPerPage = 7;
      const totalPages = Math.ceil(totalCars / itemsPerPage);

      // * If current page is empty and we're not on page 1, go to previous page
      if (currentPage > totalPages && totalPages > 0) {
        dispatch(setCurrentPage(totalPages));
        dispatch(fetchCars(totalPages));
      } else if (totalCars === 0) {
        // * If no cars left, stay on page 1
        dispatch(setCurrentPage(1));
      } else {
        // * Refresh current page to update the display
        dispatch(fetchCars(currentPage));
      }
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };
};

export const generate100Cars = () => {
  return async (dispatch: T_Dispatch) => {
    const cars: Omit<T_Car, "id">[] = [];

    for (let i = 0; i < 100; i++) {
      const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
      const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
      const color = CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];

      cars.push({
        name: `${brand} ${model}`,
        color,
      });
    }

    try {
      const createdCars = await Promise.all(
        cars.map((car) => axios.post(`${API_BASE}/garage`, car))
      );

      dispatch(generateCars(createdCars.map((response) => response.data)));
    } catch (error) {
      console.error("Failed to generate cars:", error);
    }
  };
};
