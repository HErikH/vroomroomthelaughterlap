import { createBrowserRouter } from "react-router";
import { MainLayout } from "./MainLayout";
import { NotFound } from "./NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
    //   {
    //     path: "",
    //     element: <GaragePage />,
    //   },
    //   {
    //     path: "",
    //     element: <WinnerPage />,
    //   },
      // ! Don't move it to top otherwise even on valid url it will throw not found page
      // ! Because when it on the top other paths ignored "*" matches to any path
      {
        path: "*",
        element: <NotFound />,
        // title: "not_found",
      },
    ],
  },
]);
