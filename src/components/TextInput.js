import "../App.css"
import React from "react"

const TextInput = ({ label, name, value, onChange, type, required }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type || "text"} name={name} value={value} onChange={onChange} required={required} />
    </div>
  )
}

export default TextInput
