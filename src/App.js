import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignUp from './cloudeStorage/auth/signUp/SignUp';
import SignIn from './cloudeStorage/auth/signIn/SignIn'
import CloudStorage from './cloudeStorage/main/CloudStorage'
import './cloudeStorage/config/CloudStorageApiConfig'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/api/cloude-storage/sign-up" element={<SignUp />} />
              <Route path="/api/cloude-storage/sign-in" element={<SignIn />} />
              <Route path="/api/cloude-storage" element={<CloudStorage />} />
              <Route path="/" element={<Navigate to="/api/cloude-storage" replace/>}/>
          </Routes>
      </Router>
  )
}
export default App
