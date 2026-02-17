import React from "react"

const RadioButton = ({ label, name, value, options, onChange, required }) => {
  return (
    <div>
      <label>{label}{required && <span className="required-asterisk"> *</span>}</label>
      <div>
        {options.map((option) => (
          <label key={option.value} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              required={required}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioButton
