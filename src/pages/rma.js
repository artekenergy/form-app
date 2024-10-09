import "../App.css"
import React from "react"
import { useParams } from "react-router-dom"
import RmaForm from "../components/RmaForm"

const Rma = () => {
  return (
    <div>
      <RmaForm />
    </div>
  )
}

export default Rma
