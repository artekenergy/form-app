import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MobileQuote from "./pages/mobilequote"
import StationaryQuote from "./pages/stationaryquote"
import Rma from "./pages/rma"
import HomePage from "./pages/homepage"
import ThreeD from "./pages/threed"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mobilequote" element={<MobileQuote />} />
        <Route path="/stationaryquote" element={<StationaryQuote />} />
        <Route path="/rma" element={<Rma />} />
        <Route path="/threed" element={<ThreeD />} />
      </Routes>
    </Router>
  )
}

export default App
