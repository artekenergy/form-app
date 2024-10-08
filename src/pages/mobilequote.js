import React from "react"
import { useParams } from "react-router-dom"
import MobileQuoteForm from "../components/MobileQuoteForm"

const MobileQuote = () => {
  let { id } = useParams()

  return (
    <div>
      <h1>Mobile Quotation Form {id}</h1>
      <MobileQuoteForm />
    </div>
  )
}

export default MobileQuote
