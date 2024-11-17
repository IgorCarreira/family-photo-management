import { createBrowserRouter, Navigate } from "react-router-dom";
import { NotFound } from "./pages/404";
import AppLayout from "./pages/_layout/app";
import { MyUsers } from "./pages/my-users/my-users";
import { Albums } from "./pages/albums/albums";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Navigate to="/my-users" replace />,
        },
        {
          path: "/my-users",
          element: <MyUsers />,
        },
        {
          path: "/my-users/:userId/albums",
          element: <Albums />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
