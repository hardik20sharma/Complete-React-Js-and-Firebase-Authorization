import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UpdateProfile() {

   const emailRef = useRef()
   const passwordRef = useRef()
   const passwordConfirmedRef = useRef()
   const { currentUser, updateEmail, updatePassword } = useAuth()
   const [error, setError] = useState("")          // By default, no error
   const [loading, setLoading] = useState(false)   // By default, no loading state.
    
   // We created a loading state so that user doesn't click on sign up button multiple times.
   // loading state is like a lock-in mechanism. only one click is allowed

   // Function to handle submit button
   function handleSubmit(e){
      e.preventDefault()

      // If the password doesn't match, throw error
      if(passwordRef.current.value !== passwordConfirmedRef.current.value) {
         return setError("Passwords do not match !!")
      }

      const promises = []

      setLoading(true)
      setError("")

      // Updating the email
      if(emailRef.current.value !== currentUser.email) {
         promises.push(updateEmail(emailRef.current.value))
      }
      
      // Updating the password
      if(passwordRef.current.value) {
         promises.push(updatePassword(passwordRef.current.value))
      }

      Promise.all(promises).then(() => {
         // Go back to dashboard on process completion
         Navigate('/')
      }).catch(() => {
         // Send error if we fail
         setError('Failed to update the details :/')
      }).finally(() => {
         // Setting back the loading state as false
         setLoading(false)
      })
   }

   return (
      <>
         <Card>
            <Card.Body>
               {/* Sign Up Text */}
               <h2 className="text-center mb-4">Update Profile</h2>

               {/* Error Message */}
               {error && <Alert variant="danger">{error}</Alert>}

               {/* Sign Up Form */}
               <Form onSubmit={handleSubmit}>

                  {/* Sign Up Form: Email Field */}
                  <Form.Group id="email">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                  </Form.Group>

                  {/* Sign Up Form: Password Field*/}
                  <Form.Group id="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"></Form.Control>
                  </Form.Group>

                  {/* Sign Up Form: Password Confirmation Field */}
                  <Form.Group id="password-confirm">
                     <Form.Label>Password Confirmation</Form.Label>
                     <Form.Control type="password" ref={passwordConfirmedRef} placeholder="Leave blank to keep the same"></Form.Control>
                  </Form.Group>

                  <br/>

                  {/* Sign Up Form: Submit Button */}
                  <Button disabled={loading} className="w-100" type="submit">
                     Update Profile
                  </Button>
               </Form>
            </Card.Body>
         </Card>

         {/* Redirect to Log In */}
         <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
         </div>
      </>
   )
}