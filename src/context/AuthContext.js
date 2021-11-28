import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
   return useContext(AuthContext)
}

export function AuthProvider( {children} ) {

   const [currentUser, setCurrentUser] = useState()
   // By default loading state is true, we wait for the user to be created
   const [loading, setLoading] = useState(true)

   function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
   }

   function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
   }

   function logout() {
      return auth.signOut()
   }

   function resetPassword(email) {
      return auth.sendPasswordResetEmail(email)
   }

   function updateEmail(email) {
      return currentUser.updateEmail(email)
   }

   function updatePassword(password) {
      return currentUser.updatePassword(password)
   }
   
   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setCurrentUser(user)    // Setting the user
         setLoading(false)       // Once the user is created, we set loading as false
      })

      return unsubscribe
   }, [])

   // Values and functions which needs to be exported (it means accessible to other files)
   const value = {
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      updateEmail,
      updatePassword
   }

   return (
      <AuthContext.Provider value={value}>
         {/* Don't render children till loading isn't finished. */}
         {!loading && children}
      </AuthContext.Provider>
   )
}