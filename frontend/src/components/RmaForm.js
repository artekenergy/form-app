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

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send form data to the Google Apps Script endpoint
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwp32d35d0eCxd_sMe-vyJr6EQ49blcSGAXp8q9KDSG2KRjqMeB89F6b2bLcHwbfZ9z/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Form data
          },
          body: new URLSearchParams(formData), // Serialize form data
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      if (responseData.status === "success") {
        toast.success("Form submitted successfully!")
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
      } else {
        throw new Error(responseData.message || "Unknown error occurred.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit the form. Please try again.")
    }
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
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwp32d35d0eCxd_sMe-vyJr6EQ49blcSGAXp8q9KDSG2KRjqMeB89F6b2bLcHwbfZ9z/exec",
        {
          method: "POST",
          body: formData,
        }
      )

      const responseData = await response.json()

      if (response.ok && responseData.status === "success") {
        toast.success("File uploaded successfully!")
        setSelectedFile(null)
      } else {
        throw new Error(responseData.message || "Unknown error.")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error("Failed to upload the file. Please try again.")
    } finally {
      setLoadingUpload(false)
    }
  }

  return (
    <>
      {/* RMA Form Submission */}
      <form onSubmit={handleFormSubmit}>
        <h1>RMA Form</h1>
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
