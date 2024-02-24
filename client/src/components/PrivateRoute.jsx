import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/authProvider";
import React from "react";
import TaskProvider from "../providers/taskProvider";

export default function PrivateRoutes() {
    const { loading, logged } = useAuth();

    if (loading) {
        return (
            <React.Fragment>
                <p>Loading...</p>
            </React.Fragment>
        )
    }
    return (
        logged ?
            <TaskProvider>
                <Outlet />
            </TaskProvider>
            : <Navigate to='/login' />
    )
}
