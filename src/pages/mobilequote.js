import "../App.css"
import React from "react"
import { useParams } from "react-router-dom"
import MobileQuoteForm from "../components/MobileQuoteForm"

const MobileQuote = () => {

  return (
    <div>
      
      <MobileQuoteForm />
    </div>
  )
}

export default MobileQuote
