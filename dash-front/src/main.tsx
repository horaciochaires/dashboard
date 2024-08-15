import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Dashboard from './routes/Dashboard.tsx';
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />,
  },
  {
    path:"/",
    element:<ProtectedRoutes />,
    children:[
      {
        path:"/dashboard",
        element:<Dashboard />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
