import { setCarPosition } from "../../redux/garage/actionCreators";
import type { T_Dispatch, T_RootState } from "../../store/store";

export function animateCar(
  carId: number,
  velocity: number,
  distance: number,
  dispatch: T_Dispatch
): Promise<void> {
  return new Promise((resolve) => {
    const carElement = document.querySelector(
      `[data-car-id="${carId}"] .car-track__car`
    ) as HTMLElement;

    if (!carElement) {
      resolve();
      return;
    }

    const trackElement = carElement.closest(".car-track__road") as HTMLElement;

    if (!trackElement) {
      resolve();
      return;
    }

    const trackWidth = trackElement.offsetWidth;
    const carWidth = carElement.offsetWidth;
    const maxDistance = trackWidth - carWidth;

    // * Calculate animation duration based on velocity (velocity is in px/ms, distance is total distance)
    // * This gives us the time in milliseconds
    const duration = distance / velocity;

    carElement.style.transition = `left ${duration}ms linear`;
    carElement.style.left = `${maxDistance}px`;

    setTimeout(() => {
      const currentLeft = carElement.offsetLeft;

      dispatch(setCarPosition({ id: carId, position: currentLeft }));
      resolve();
    }, duration);
  });
}

export function stopAnimateCar(
  carId: number,
  left: number | null = null,
  dispatch: T_Dispatch
) {
  const carElement = document.querySelector(
    `[data-car-id="${carId}"] .car-track__car`
  ) as HTMLElement;

  if (carElement) {
    const currentLeft = carElement.offsetLeft;
    const correctLeft = left !== null ? left : currentLeft

    carElement.style.transition = "none";
    carElement.style.left = correctLeft + "px";
    dispatch(
      setCarPosition({
        id: carId,
        position: correctLeft,
      })
    );
  }
}

export function getVisibleCars(state: T_RootState) {
  const currentPage = state.garage.currentPage;
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Only get cars visible on current page
  const visibleCars = state.garage.cars.slice(startIndex, endIndex);

  return visibleCars;
}