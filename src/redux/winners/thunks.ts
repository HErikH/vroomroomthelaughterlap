import axios from "axios";
import type { T_Dispatch, T_RootState } from "../../store/store";
import type {
  T_CarWithWins,
  T_Winner,
  T_WinnerSortBy,
  T_WinnerSortOrder,
} from "./types";
import {
  setWinners,
  addWinner,
  updateWinner,
  setTotalWinners,
  setCurrentPage,
} from "./actionCreators";

const API_BASE: string = import.meta.env.VITE_API_BASE;

export const fetchWinners = (
  page: number = 1,
  limit: number = 10,
  sort?: "id" | T_WinnerSortBy,
  order?: T_WinnerSortOrder
) => {
  return async (dispatch: T_Dispatch, getState: () => T_RootState) => {
    try {
      const state = getState();
      const currentPage = page || state.winners.currentPage;

      let url = `${API_BASE}/winners?_page=${currentPage}&_limit=${limit}`;
      if (sort && order) {
        url += `&_sort=${sort}&_order=${order}`;
      }

      const [winnersResponse, carsResponse] = await Promise.all([
        axios.get(url),
        axios.get(`${API_BASE}/garage`),
      ]);

      const winners: T_Winner[] = winnersResponse.data;
      const cars = carsResponse.data;
      const totalCount = parseInt(
        winnersResponse.headers["x-total-count"] || "0"
      );

      const winnersWithCars: T_CarWithWins[] = winners.map((winner) => {
        const car = cars.find((c: any) => c.id === winner.id);
        return {
          ...car,
          wins: winner.wins,
          bestTime: winner.time,
        };
      });

      dispatch(setWinners(winnersWithCars));
      dispatch(setTotalWinners(totalCount));

      if (page) {
        dispatch(setCurrentPage(page));
      }
    } catch (error) {
      console.error("Failed to fetch winners:", error);
    }
  };
};

export const addWinnerThunk = (carId: number, time: number) => {
  return async (dispatch: T_Dispatch) => {
    try {
      // Check if winner already exists
      const existingWinner = await axios
        .get(`${API_BASE}/winners/${carId}`)
        .catch(() => null);

      if (existingWinner?.data) {
        // Update existing winner
        const newWins = existingWinner.data.wins + 1;
        const newBestTime = Math.min(existingWinner.data.time, time);

        await axios.put(`${API_BASE}/winners/${carId}`, {
          wins: newWins,
          time: newBestTime,
        });

        dispatch(
          updateWinner({
            id: carId,
            wins: newWins,
            bestTime: newBestTime,
          } as T_CarWithWins)
        );
      } else {
        // Create new winner
        await axios.post(`${API_BASE}/winners`, {
          id: carId,
          wins: 1,
          time,
        });

        dispatch(
          addWinner({ id: carId, wins: 1, bestTime: time } as T_CarWithWins)
        );
      }
    } catch (error) {
      console.error("Failed to add/update winner:", error);
    }
  };
};
