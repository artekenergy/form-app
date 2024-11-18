import React from "react"

const RadioButton = ({ label, name, value, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <label key={option.value} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioButton
