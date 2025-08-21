import { useEffect, useState } from "react";
import type { T_Car } from "../../../redux/garage/types";
import { setWinner } from "../../../redux/race/actionCreators";
import { useAppDispatch } from "../../../store/hooks";
import "./style.scss";

type T_WinnerBannerProps = {
  winner: T_Car;
};

export function WinnerBanner({ winner }: T_WinnerBannerProps) {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);

  function handleClose() {
    dispatch(setWinner(null));
    setVisible(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [winner]);

  if (!visible) return null;

  return (
    <div className="winner-banner">
      <div className="winner-banner__content">
        <h2>🏆 Winner! 🏆</h2>
        <div className="winner-banner__car">
          <span
            className="winner-banner__icon"
            style={{ backgroundColor: winner.color }}
          >
            🏎️
          </span>
          <span className="winner-banner__name">{winner.name}</span>
        </div>
        <button
          className="winner-banner__close"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
