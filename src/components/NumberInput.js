import React from "react"

const NumberInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="number" name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default NumberInput
