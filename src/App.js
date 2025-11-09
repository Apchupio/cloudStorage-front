import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './cloudeStorage/auth/signUp/SignUp';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/api/cloude-storage/sign-up" element={<SignUp />} />
          </Routes>
      </Router>
  )
}

export default App
