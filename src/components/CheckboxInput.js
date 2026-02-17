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
        {label}{required && <span className="required-asterisk"> *</span>}
      </label>
    </div>
  )
}

export default CheckboxInput
