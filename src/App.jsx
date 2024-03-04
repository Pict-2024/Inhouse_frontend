// import React, { useState } from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StudentRoutes } from "./routes/StudentRoutes";
import { TeacherRoutes } from "./routes/TeacherRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import SDashboard from "./pages/Student/SDashboard";
import { HomePage } from "./pages/HomePage";
import { AuthRoutes } from "./routes/AuthRoutes";

const router = createBrowserRouter([
  // global routes
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "blogs",
        element: <SDashboard />,
      },
    ],
  },

  // protected routes
  StudentRoutes,
  TeacherRoutes,
  AdminRoutes,
  AuthRoutes,
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;