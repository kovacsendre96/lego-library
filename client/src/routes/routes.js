import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LegoSetsPage from "../views/LegoSetsPage";
import SetDetailsPage from "../views/SetDetailsPage";
import MissingPiecesPage from "../views/MissingPiecesPage";
import MainLayout from "../Layout/MainLayout";
import LandingPage from "../views/LandingPage";
import NewSetPage from "../views/NewSetPage";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout />,


    children: [
      {
        path: "/landing",
        element: <LandingPage />,
      },
      {
        path: "lego-sets",
        element: <LegoSetsPage />,
      },
      {
        path: "new-set",
        element: <NewSetPage />,
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
