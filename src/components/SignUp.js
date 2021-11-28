import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmedRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")          // By default, no error
    const [loading, setLoading] = useState(false)   // By default, no loading state.
    
    // We created a loading state so that user doesn't click on sign up button multiple times.
    // loading state is like a lock-in mechanism. only one click is allowed

    // Function to handle submit button
    async function handleSubmit(e){
        e.preventDefault()

        // If the password doesn't match, throw error
        if(passwordRef.current.value !== passwordConfirmedRef.current.value) {
            return setError("Passwords do not match !!")
        }

        // Try signing up, if error is found, throw the error
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch {
            setError("Failed to create an account !!")
        }
        
        // Setting back the loading state as false
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {/* Sign Up Text */}
                    <h2 className="text-center mb-4">Sign Up</h2>

                    {/* Error Message */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Sign Up Form */}
                    <Form onSubmit={handleSubmit}>

                        {/* Sign Up Form: Email Field */}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>

                        {/* Sign Up Form: Password Field*/}
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>

                        {/* Sign Up Form: Password Confirmation Field */}
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmedRef} required></Form.Control>
                        </Form.Group>

                        <br/>

                        {/* Sign Up Form: Submit Button */}
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Redirect to Log In */}
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In!</Link>
            </div>
        </>
    )
}