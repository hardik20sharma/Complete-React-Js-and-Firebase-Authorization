import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
   const emailRef = useRef()
   const { resetPassword } = useAuth()
   const [error, setError] = useState("")          // By default, no error
   // We created a loading state so that user doesn't click on sign up button multiple times.
   // loading state is like a lock-in mechanism. only one click is allowed
   const [loading, setLoading] = useState(false)   // By default, no loading state
   const [message, setMessage] = useState("")


   // Function to handle submit button
   async function handleSubmit(e){
      e.preventDefault()

      // Try signing up, if error is found, throw the error
      try {
         setMessage("")
         setError("")
         setLoading(true)
         await resetPassword(emailRef.current.value)
         setMessage("Please check your inbox for further instructions!")
      }
      catch {
         setError("Failed to reset password :/")
      }
        
      // Setting back the loading state as false
      setLoading(false)
   }

   return (
      <>
         <Card>
            <Card.Body>
               {/* Sign Up Text */}
               <h2 className="text-center mb-4">Reset Password</h2>

               {/* Error Message */}
               {error && <Alert variant="danger">{error}</Alert>}
               {/* Password Reset Successful Message */}
               {message && <Alert variant="success">{message}</Alert>}

               {/* Sign Up Form */}
               <Form onSubmit={handleSubmit}>
                  {/* Sign Up Form: Email Field */}
                  <Form.Group id="email">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" ref={emailRef} required></Form.Control>
                  </Form.Group>

                  <br/>

                  {/* Sign Up Form: Submit Button */}
                  <Button disabled={loading} className="w-100" type="submit">
                     Reset Password
                  </Button>
               </Form>

               {/* Forgot Password Section */}
               <div className="w-100 text-center mt-3">
                  <Link to="/login">Login</Link>
               </div>

            </Card.Body>
         </Card>

         {/* Redirect to Log In */}
         <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup">Sign Up!</Link>
         </div>
      </>
   )
}