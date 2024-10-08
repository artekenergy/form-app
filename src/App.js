import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MobileQuote from "./pages/mobilequote"
import Navigation from "./components/Navigation" // Assuming you have a Navigation component

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/mobilequote" element={<MobileQuote />} />
      </Routes>
    </Router>
  )
}

export default App
