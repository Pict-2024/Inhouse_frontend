// import React, { useState } from 'react'
import './App.css'
import { Dashboard } from './pages/Student/Dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import { StudentRoutes } from './routes/StudentRoutes';
import { TeacherRoutes } from './routes/TeacherRoutes';
import { AdminRoutes } from './routes/AdminRoutes';


const router = createBrowserRouter([
  // global routes
  {
    path: "/",
    element: <Dashboard/>,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "blogs",
        element: <Dashboard/>
      }
    ]
  },

  // protected routes
  StudentRoutes,
  TeacherRoutes,
  AdminRoutes,
]);

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer />
    
    </>
  )
}

export default App
