import React from "react"
import DashBoard from "./DashBoard";
import SignUp from "./SignUp";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        
        <Router>
          <AuthProvider>
            <Routes>
              
              {/* Route - DashBoard | PRIVATE */}
              <Route exact path="/" element={ <PrivateRoute> <DashBoard/> </PrivateRoute> } />

              {/* Route - Update Profile | PRIVATE */}
              <Route path="/update-profile" element={ <PrivateRoute> <UpdateProfile/> </PrivateRoute> } />

              {/* Route - Sign Up Form */}
              <Route exact path="/signup" element={<SignUp/>} />

              {/* Route - Login Form */}
              <Route exact path="/login" element={<Login/>} />

              {/* Route - Forgot Password Form */}
              <Route exact path="/forgot-password" element={<ForgotPassword/>} />

            </Routes>
          </AuthProvider>
        </Router>

      </div>
    </Container>
  )
}

export default App;