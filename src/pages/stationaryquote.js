import React from "react"
import { useParams } from "react-router-dom"
import StationaryQuoteForm from "../components/StationaryQuoteForm"

const StationaryQuote = () => {
  let { id } = useParams()

  return (
    <div>
      <h1>Stationary Quotation Form {id}</h1>
      <StationaryQuoteForm />
    </div>
  )
}

export default StationaryQuote
