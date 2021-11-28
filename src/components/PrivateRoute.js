// We created a PrivateRoute file as a wrapper to Route to add aditional functionality.
// Route faced an issue. When the user logged out, it was still rendering the dashboard.
// To ensure everything renders when user is logged in, we used PrivateRoute.
// Nothing will be rendered if the user isn't logged in.

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute( { children } ) {

   const { currentUser } = useAuth()

   // If there is no user logged in, we navigate to login page
   return (currentUser) ? children : <Navigate to="/login"/>
}