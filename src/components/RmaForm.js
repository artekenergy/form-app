import React, { useState } from "react"
import TextInput from "./TextInput"
import RadioButton from "./RadioButton"
import CheckboxInput from "./CheckboxInput"
import TextArea from "./TextArea"
// import IFrame from "./IFrame"; // Remove or comment out
import FileUpload from "./FileUpload"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BenchTestModal from "./BenchTestModal" // <-- import our modal

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxROdBsUMRx0ngUpsPC8_jj9zbtwTGWCy1F9wsvZD8NlY4HVOerPOxJUokt_VPvmz_8/exec"

const RmaForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    shippingAddress: "",
    serialNumber: "",
    installationDate: "",
    failureDate: "",
    firmwareUpdated: "",
    firmwareVersion: "",
    failureDescription: "",
    acknowledgeShippingCosts: false,
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State for controlling the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOpenModal = (productType) => {
    setSelectedProduct(productType)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (file) => {
    setSelectedFile(file)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!selectedFile) {
        toast.error("Please upload a file (PDF of pre-test) before submitting.")
        setIsSubmitting(false)
        return
      }

      // Read the file as Base64
      const fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = () => {
          const base64String = reader.result.split(",")[1]
          resolve(base64String)
        }
        reader.onerror = (error) => reject(error)
      })

      // Prepare form data
      const urlEncodedData = new URLSearchParams()
      urlEncodedData.append("action", "submitAndUpload")
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          urlEncodedData.append(key, formData[key])
        }
      }
      urlEncodedData.append("fileName", selectedFile.name)
      urlEncodedData.append("fileType", selectedFile.type)
      urlEncodedData.append("fileData", fileBase64)

      // Send data to GAS
      const response = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: urlEncodedData.toString(),
      })

      const responseText = await response.text()
      const responseData = JSON.parse(responseText)

      if (response.ok && responseData.status === "success") {
        toast.success("Form submitted successfully!")
        // Reset form and file state
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          phone: "",
          shippingAddress: "",
          serialNumber: "",
          installationDate: "",
          failureDate: "",
          firmwareUpdated: "",
          firmwareVersion: "",
          failureDescription: "",
          acknowledgeShippingCosts: false,
        })
        setSelectedFile(null)
      } else {
        throw new Error(responseData.message || "Unknown error occurred.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h1>RMA Form</h1>
        <h2>RMA Filing Instructions</h2>
        <h4 style={{ color: "red" }}>
          Please fill out the form below and click the "submit" button once
          completed.
          <br />
          <br />
          Please save the Pre-RMA Bench Test form as a PDF and attach it below
          before hitting "submit."
          <br />
          <br />
          RMAs submitted without the pre-test requirements will be rejected.
          <br />
          Questions? Contact Claire at{" "}
          <a href="mailto:claire@artek.energy">claire@artek.energy</a>
          <br />
          <br />
        </h4>

        <h2>General information</h2>
        <TextInput
          label="First Name:"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Last Name:"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Company:"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email:"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Phone:"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <TextInput
          label="Shipping Address:"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleInputChange}
        />
        <TextInput
          label='Serial Number (Begins in "HQ"):'
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleInputChange}
        />
        <TextInput
          label="Installation Date:"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleInputChange}
        />
        <TextInput
          label="Failure Date:"
          name="failureDate"
          type="date"
          value={formData.failureDate}
          onChange={handleInputChange}
        />
        <RadioButton
          label="Firmware Updated?"
          name="firmwareUpdated"
          value={formData.firmwareUpdated}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Not Applicable", value: "na" },
          ]}
          onChange={handleInputChange}
        />
        {formData.firmwareUpdated === "yes" && (
          <TextInput
            label="Firmware Version:"
            name="firmwareVersion"
            value={formData.firmwareVersion}
            onChange={handleInputChange}
          />
        )}
        <TextArea
          label="Brief Description of Failure:"
          name="failureDescription"
          value={formData.failureDescription}
          onChange={handleInputChange}
        />
        <CheckboxInput
          label="I acknowledge that Artek does not cover shipping costs for replacement products or shipping to and from repair centers."
          name="acknowledgeShippingCosts"
          checked={formData.acknowledgeShippingCosts}
          onChange={handleInputChange}
        />

        <h2>Pre-RMA Bench Test Instructions</h2>
        <p>
          Select a product below to open the associated Pre-RMA Bench Test
          Instructions. Complete the form in the popup, export as PDF, and then
          attach it below before submitting.
        </p>
        <div style={{ marginBottom: "1rem" }}>
          <ul>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("inverter")}
              >
                Inverter
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("sunInverter")}
              >
                Sun Inverter
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("inverterCharger")}
              >
                Inverter/Charger
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("smartCharger")}
              >
                SmartSolar MPPT RS Charger
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("mpptCharger")}
              >
                MPPT Solar Charger
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("bmvBatteryMonitor")}
              >
                BMV Battery Monitors
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("batteryProtect")}
              >
                Battery Protect
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("orion")}
              >
                Orion-Tr DC-DC Converter
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("leadBattery")}
              >
                Lead Acid Battery
              </button>
            </li>
            <li>
              <button
                type="button"
                className="modal-btn"
                onClick={() => handleOpenModal("lithiumBattery")}
              >
                Smart Lithium Battery
              </button>
            </li>
          </ul>
        </div>
        <FileUpload
          onFileChange={handleFileChange}
          selectedFile={selectedFile}
        />
        <br />

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer />

      {/* Our new modal component */}
      <BenchTestModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        productType={selectedProduct}
      />
    </>
  )
}

export default RmaForm
