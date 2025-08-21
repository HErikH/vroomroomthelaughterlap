import { createBrowserRouter } from "react-router";
import { MainLayout } from "./MainLayout";
import { NotFoundPage } from "./NotFoundPage/NotFoundPage";
import { GaragePage } from "./GaragePage/GaragePage";
import { WinnersPage } from "./WinnersPage/WinnersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <GaragePage />,
      },
      {
        path: "garage",
        element: <GaragePage />,
      },
      {
        path: "winners",
        element: <WinnersPage />,
      },
      // ! Don't move it to top otherwise even on valid url it will throw not found page
      // ! Because when it on the top other paths ignored "*" matches to any path
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
