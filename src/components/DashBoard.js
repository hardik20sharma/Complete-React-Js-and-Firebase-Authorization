import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function DashBoard() {

   const [error, setError] = useState("")
   const { currentUser, logout } = useAuth()
   const navigate = useNavigate()

   async function handleLogOut() {
      setError("")
      try{
         await logout()
         navigate("/login")
      }
      catch{
         setError("Failed to Log Out :/")
      }
   }

   return (
      <>
         <Card>
            <Card.Body>
               <h2 className="text-center mb-4">Profile</h2>

               {/* Error Message */}
               {error && <Alert variant="danger">{error}</Alert>}

               <strong>Email: </strong> {currentUser.email}

               <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
         </Card>

         {/* Log Out Button */}
         <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogOut}>Log Out</Button>
         </div>
      </>
   )
}