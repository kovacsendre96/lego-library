import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LegoSetsPage from "../views/LegoSetsPage";
import SetDetailsPage from "../views/SetDetailsPage";
import MissingPiecesPage from "../views/MissingPiecesPage";
import MainLayout from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "lego-sets",
        element: <LegoSetsPage />,
      },
      {
        path: "lego-sets/:id",
        element: <SetDetailsPage />,
      },
      {
        path: "missing-pieces",
        element: <MissingPiecesPage />,
      },
    ],
  },
]);
