import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MobileQuote from "./pages/mobilequote"
import StationaryQuote from "./pages/stationaryquote"
import Rma from "./pages/rma"
import Navigation from "./components/Navigation" // Assuming you have a Navigation component

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/mobilequote" element={<MobileQuote />} />
        <Route path="/stationaryquote" element={<StationaryQuote />} />
        <Route path="/rma" element={<Rma />} />
      </Routes>
    </Router>
  )
}

export default App
