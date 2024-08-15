import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoutes() {
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet/> : <Navigate to="/" />;
    
}