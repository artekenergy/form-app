import React from "react"

const TextArea = ({ label, name, value, onChange, rows, required }) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 4} // Default rows to 4 if not specified
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        required={required}
      />
    </div>
  )
}

export default TextArea
