import "../App.css"
import React from "react"
import { useParams } from "react-router-dom"
import StationaryQuoteForm from "../components/StationaryQuoteForm"

const StationaryQuote = () => {
  return (
    <div>
      <h1>Stationary Quotation Form</h1>
      <StationaryQuoteForm />
    </div>
  )
}

export default StationaryQuote
