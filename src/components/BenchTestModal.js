import React, { useState, useRef } from "react"
import ReactModal from "react-modal"
import { useReactToPrint } from "react-to-print"

ReactModal.setAppElement("#root")

// Some example data structure for each product's unique questions
// Each "category" could be a table heading, and within it, an array of questions.
const PRODUCT_QUESTIONS = {
  inverter: {
    title: "Inverter Bench Test Instructions",
    categories: [
      {
        heading: "Initial check",
        questions: [
          {
            id: "waterDamage",
            text: "Does the unit have internal water damage or corrosion?",
            options: [
              { value: "yes", label: "Yes, no warranty." },
              { value: "no", label: "No." },
            ],
          },
          {
            id: "unitDirty",
            text: "Are the internals of the unit dirty, or is there soot/dust/oil present?",
            options: [
              { value: "yes", label: "Yes, no warranty." },
              { value: "no", label: "No." },
            ],
          },
          {
            id: "foreignObjects",
            text: "Are there foreign objects inside the unit: like screws, animals or insects?",
            options: [
              { value: "yes", label: "Yes, no warranty." },
              { value: "no", label: "No." },
            ],
          },
          {
            id: "unitDirty",
            text: "Are the internals of the unit dirty, or is there soot/dust/oil present?",
            options: [
              { value: "yes", label: "Yes, no warranty." },
              { value: "no", label: "No." },
            ],
          },
        ],
      },
    ],
  },

  sunInverter: {
    title: "Sun Inverter Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
  inverterCharger: {
    title: "Inverter/Charger Bench Test Instructions",
    instructions: "1. Connect the inverter...\n2. Measure voltage...\n3. ...",
  },
  smartCharger: {
    title: "SmartSolar MPPT RS Charger Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
  mpptCharger: {
    title: "MPPT Solar Charger Bench Test Instructions",
    instructions: "1. Connect the inverter...\n2. Measure voltage...\n3. ...",
  },
  smartSolarCharger: {
    title: "Charger Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
  bmvBatteryMonitor: {
    title: "BMV Battery Monitors Bench Test Instructions",
    instructions: "1. Connect the inverter...\n2. Measure voltage...\n3. ...",
  },
  batteryProtect: {
    title: "Battery Protect Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
  orion: {
    title: "Orion-Tr DC-DC Converter Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
  leadBattery: {
    title: "Lead Acid Battery Bench Test Instructions",
    instructions: "1. Connect the inverter...\n2. Measure voltage...\n3. ...",
  },
  lithiumBattery: {
    title: "Smart Lithium Battery Bench Test Instructions",
    instructions: "1. Connect the charger...\n2. Verify current...\n3. ...",
  },
}

const BenchTestModal = ({ isOpen, onRequestClose, productType }) => {
  // For printing as PDF
  const formRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  })

  // Get the data for the current product
  const productData = PRODUCT_QUESTIONS[productType]

  // Create local state to store user answers.
  // You can shape this however you like. For example:
  const initialFormState = {}
  if (productData) {
    productData.categories.forEach((cat) => {
      cat.questions.forEach((q) => {
        initialFormState[q.id] = ""
      })
    })
  }

  const [answers, setAnswers] = useState(initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setAnswers((prev) => ({ ...prev, [name]: value }))
  }

  if (!productData) {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{ content: { maxWidth: "800px", margin: "auto" } }}
      >
        <div>
          <p>No bench test instructions found for this product.</p>
          <button type="button" onClick={onRequestClose}>
            Close
          </button>
        </div>
      </ReactModal>
    )
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ content: { maxWidth: "800px", margin: "auto" } }}
    >
      <div ref={formRef}>
        <h2>{productData.title}</h2>

        {/* Loop through categories */}
        {productData.categories.map((cat, catIndex) => (
          <table
            key={catIndex}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f0f0f0",
                }}
              >
                <th colSpan="2" style={{ textAlign: "left", padding: "8px" }}>
                  {cat.heading}
                </th>
              </tr>
            </thead>
            <tbody>
              {cat.questions.map((q) => (
                <tr key={q.id} style={{ borderBottom: "1px solid #ccc" }}>
                  {/* Question cell */}
                  <td
                    style={{
                      width: "60%",
                      padding: "12px",
                      backgroundColor: "#ececec",
                    }}
                  >
                    {q.text}
                  </td>

                  {/* Answers cell */}
                  <td style={{ width: "40%", padding: "12px" }}>
                    {q.options.map((opt) => (
                      <label
                        key={opt.value}
                        style={{ display: "block", marginBottom: "8px" }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={answers[q.id] === opt.value}
                          onChange={handleChange}
                          style={{ marginRight: "6px" }}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}

        {/* Additional form fields? Place them here */}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {/* Button styling – match your "submit" button look */}
        <button
          type="button"
          className="modal-btn" /* or whatever class you use */
          onClick={handlePrint}
        >
          Export as PDF
        </button>
        <button
          type="button"
          className="modal-btn"
          onClick={onRequestClose}
          style={{ marginLeft: "8px" }}
        >
          Close
        </button>
      </div>
    </ReactModal>
  )
}

export default BenchTestModal
