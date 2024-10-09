import "../App.css"
import React from "react"
import { useParams } from "react-router-dom"
import StationaryQuoteForm from "../components/StationaryQuoteForm"

const StationaryQuote = () => {
  return (
    <div>
      <StationaryQuoteForm />
    </div>
  )
}

export default StationaryQuote
