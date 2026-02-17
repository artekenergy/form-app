import React from "react"

const CheckboxInput = ({ label, name, checked, onChange, required }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
        />
        {label}
      </label>
    </div>
  )
}

export default CheckboxInput
