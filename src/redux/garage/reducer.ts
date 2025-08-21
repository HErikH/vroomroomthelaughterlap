import type { T_GarageState, T_GarageActions } from "./types";
import { GARAGE_ACTION_TYPES } from "./actionTypes";

const initialState: T_GarageState = {
  cars: [],
  currentPage: 1,
  totalCars: 0,
  selectedCarId: null,
  editingCar: null,
  isCreating: false,
  formState: {
    createForm: {
      name: "",
      color: "#000000",
    },
    editForm: {
      name: "",
      color: "#000000",
    },
  },
};

export const garageReducer = (
  state = initialState,
  action: T_GarageActions
): T_GarageState => {
  switch (action.type) {
    case GARAGE_ACTION_TYPES.SET_CARS:
      return {
        ...state,
        cars: action.payload,
      };

    case GARAGE_ACTION_TYPES.ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload],
        totalCars: state.totalCars + 1,
      };

    case GARAGE_ACTION_TYPES.UPDATE_CAR:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
      };

    case GARAGE_ACTION_TYPES.DELETE_CAR:
      const newTotalCars = state.totalCars - 1;
      const itemsPerPage = 7;
      const totalPages = Math.ceil(newTotalCars / itemsPerPage);
      const shouldMoveToPrevPage =
        state.currentPage > totalPages && totalPages > 0;

      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
        totalCars: newTotalCars,
        currentPage: shouldMoveToPrevPage
          ? totalPages
          : newTotalCars === 0
          ? 1
          : state.currentPage,
        selectedCarId:
          state.selectedCarId === action.payload ? null : state.selectedCarId,
      };

    case GARAGE_ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GARAGE_ACTION_TYPES.SET_SELECTED_CAR:
      return {
        ...state,
        selectedCarId: action.payload,
      };

    case GARAGE_ACTION_TYPES.SET_CREATING:
      return {
        ...state,
        isCreating: action.payload,
      };

    case GARAGE_ACTION_TYPES.SET_TOTAL_CARS:
      return {
        ...state,
        totalCars: action.payload,
      };

    case GARAGE_ACTION_TYPES.GENERATE_CARS:
      return {
        ...state,
        cars: [...state.cars, ...action.payload],
        totalCars: state.totalCars + action.payload.length,
      };

    case GARAGE_ACTION_TYPES.SET_CAR_POSITION:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id
            ? { ...car, position: action.payload.position }
            : car
        ),
      };

    case GARAGE_ACTION_TYPES.UPDATE_CREATE_FORM:
      return {
        ...state,
        formState: {
          ...state.formState,
          createForm: {
            ...state.formState.createForm,
            ...action.payload,
          },
        },
      };

    case GARAGE_ACTION_TYPES.UPDATE_EDIT_FORM:
      return {
        ...state,
        formState: {
          ...state.formState,
          editForm: {
            ...state.formState.editForm,
            ...action.payload,
          },
        },
      };

    case GARAGE_ACTION_TYPES.CLEAR_CREATE_FORM:
      return {
        ...state,
        formState: {
          ...state.formState,
          createForm: { ...initialState.formState.createForm },
        },
      };

    case GARAGE_ACTION_TYPES.CLEAR_EDIT_FORM:
      return {
        ...state,
        formState: {
          ...state.formState,
          editForm: { ...initialState.formState.editForm },
        },
      };

    case GARAGE_ACTION_TYPES.SET_EDITING_CAR:
      return {
        ...state,
        editingCar: action.payload,
        formState: {
          ...state.formState,
          editForm: action.payload
            ? {
                name: action.payload.name,
                color: action.payload.color,
              }
            : {
                name: "",
                color: "#000000",
              },
        },
      };

    default:
      return state;
  }
};
