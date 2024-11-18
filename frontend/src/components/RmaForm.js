import React, { useState } from "react"
import TextInput from "./TextInput"
import RadioButton from "./RadioButton"
import CheckboxInput from "./CheckboxInput"
import TextArea from "./TextArea"
import IFrame from "./IFrame"
import FileUpload from "./FileUpload"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
  const [loadingUpload, setLoadingUpload] = useState(false)

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

  const handleFormSubmit = () => {
    toast.success("Submitting form directly to server!")
  }

  const handleUploadFile = async (e) => {
    e.preventDefault()
    setLoadingUpload(true)

    if (!selectedFile) {
      toast.error("Please select a file to upload.")
      setLoadingUpload(false)
      return
    }

    try {
      // Implement your file upload logic here
      toast.success("File uploaded successfully!")
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error("An error occurred while uploading the file.")
    } finally {
      setLoadingUpload(false)
    }
  }

  return (
    <>
      {/* Form for submitting main RMA details */}
      <form
        action="https://script.google.com/macros/s/AKfycbxTkfwAXnlyJw54Pr5XjNuX94y_8JYRX2xUT3fpRoqdJVFLtLEUi9h_KRTKcMWb755y/exec"
        method="POST"
        target="_blank" // Opens the response in a new tab
        onSubmit={handleFormSubmit}
      >
        <h1>RMA Form</h1>
        <h2>PART I - Contact</h2>

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
          label="Serial Number:"
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
        <button type="submit">Submit</button>
      </form>

      {/* File Upload */}
      <form onSubmit={handleUploadFile}>
        <h2>PART III - Pre-RMA Bench Test Instructions </h2>
        <p>
          To file an RMA for any of the following product categories, you will
          need to complete the associated form. Once the form is completed
          online, download the completed form as a PDF and attach it below.
        </p>
        <div className="rmaProductList">
          <ul>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---inverter.html"
                title="Inverter"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form-sun-inverter.html"
                title="Sun Inverter"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---inverter-charger.html"
                title="Inverter/Charger"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---smart-charger.html"
                title="Smart Charger"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---mppt-solar-charger.html"
                title="MPPT Solar Charger"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---smartsolar-mppt-rs.html"
                title="SmartSolar MPPT RS Charger"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---bmv-battery-monitor.html"
                title="BMV Battery Monitors"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---batteryprotect.html"
                title="Battery Protect"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---orion-tr-dc-dc-converter.html"
                title="Orion-Tr DC-DC Converter"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---lead-acid-battery.html"
                title="Lead Acid Battery"
                width="100%"
                height="80%"
              />
            </li>
            <li>
              <IFrame
                url="https://www.victronenergy.com/media/pg/Pre-RMA_Bench_Test_Instructions/en/pre-rma-test-form---lithium-battery-smart.html"
                title="Smart Lithium Battery"
                width="100%"
                height="80%"
              />
            </li>
          </ul>
        </div>

        <FileUpload
          onFileChange={handleFileChange}
          selectedFile={selectedFile}
        />
        <br />
        <button type="submit" disabled={loadingUpload}>
          {loadingUpload ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      <ToastContainer />
    </>
  )
}

export default RmaForm
