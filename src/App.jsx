import React from 'react'
import HomePage from './HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/browse" replace />} />  {/* Điều hướng "/" đến "/browse" */}
            <Route path="/browse" element={<HomePage />} />
        </Routes>
    </Router>
  )
}

export default App
