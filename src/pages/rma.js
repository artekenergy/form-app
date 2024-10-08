import React from "react"
import { useParams } from "react-router-dom"
import RmaForm from "../components/RmaForm"

const Rma = () => {
  let { id } = useParams()

  return (
    <div>
      <h1>RMA Form {id}</h1>
      <RmaForm />
    </div>
  )
}

export default Rma
