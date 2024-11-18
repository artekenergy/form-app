import React, { useState } from "react"
import TextInput from "./TextInput"
import RadioButton from "./RadioButton"
import CheckboxInput from "./CheckboxInput"
import TextArea from "./TextArea"
import IFrame from "./IFrame"
import FileUpload from "./FileUpload"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CLIENT_ID =
  "603351500773-o9smkof98e28rd06ksv3st0grbn8ochp.apps.googleusercontent.com"
const SCOPES = "https://www.googleapis.com/auth/drive.file"

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
  const [loadingForm, setLoadingForm] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [tokenClient, setTokenClient] = useState(null)

  // Initialize GIS token client
  React.useEffect(() => {
    const initializeGisClient = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response && response.access_token) {
            toast.success("Google authorization successful!")
          } else {
            toast.error("Google authorization failed!")
          }
        },
      })
      setTokenClient(client)
    }

    const loadGisScript = () => {
      if (document.getElementById("gis-script")) return

      const script = document.createElement("script")
      script.id = "gis-script"
      script.src = "https://accounts.google.com/gsi/client"
      script.onload = initializeGisClient
      script.onerror = () =>
        toast.error("Failed to load Google Identity Services")
      document.body.appendChild(script)
    }

    loadGisScript()
  }, [])

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

  const authenticate = async () => {
    if (!tokenClient) {
      toast.error("Google client not initialized. Please try again.")
      return null
    }

    return new Promise((resolve, reject) => {
      tokenClient.callback = (response) => {
        if (response && response.access_token) {
          resolve(response.access_token)
        } else {
          reject(new Error("Failed to retrieve access token"))
        }
      }
      tokenClient.requestAccessToken()
    })
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
      const accessToken = await authenticate()
      if (!accessToken) throw new Error("Authorization failed")

      const metadata = {
        name: selectedFile.name,
        mimeType: selectedFile.type,
      }

      const formData = new FormData()
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      )
      formData.append("file", selectedFile)

      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      if (response.ok) {
        const data = await response.json()
        toast.success(`File uploaded successfully: ${data.name}`)
        setSelectedFile(null)
      } else {
        throw new Error("File upload failed")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error("An error occurred while uploading the file.")
    } finally {
      setLoadingUpload(false)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setLoadingForm(true)

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      setLoadingForm(false)
      return
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz_NTRp8PJJQHyD5ENLoidvHUNZnJO8rp7B976_8noWISPoqS-buQlIdOloe8uPtBIo/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // GAS expects form-urlencoded data
          },
          body: new URLSearchParams({
            action: "submitForm",
            ...formData,
          }),
        }
      )

      const responseData = await response.json()

      if (response.ok && responseData.status === "success") {
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
        toast.error(
          `Form submission failed: ${responseData.message || "Unknown error."}`
        )
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred while submitting the form.")
    } finally {
      setLoadingForm(false)
    }
  }

  return (
    <>
      {/* RMA Form Submission */}
      <form onSubmit={handleSubmitForm}>
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

        <CheckboxInput
          label="I acknowledge that Artek does not cover shipping costs for replacement products or shipping to and from repair centers."
          name="acknowledgeShippingCosts"
          checked={formData.acknowledgeShippingCosts}
          onChange={handleInputChange}
        />

        <h2>PART II - Product Information</h2>

        <TextInput
          label="Serial Number (beginning in HQ):"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleInputChange}
        />
        <TextInput
          label="Installation Date (MM/DD/YY):"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleInputChange}
        />
        <TextInput
          label="Failure Date (MM/DD/YY):"
          name="failureDate"
          type="date"
          value={formData.failureDate}
          onChange={handleInputChange}
        />

        <h3>Firmware Updated?</h3>
        <RadioButton
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
            label="Specify Firmware Version:"
            name="firmwareVersion"
            value={formData.firmwareVersion}
            onChange={handleInputChange}
          />
        )}

        <TextArea
          label="Brief description of failure:"
          name="failureDescription"
          value={formData.failureDescription}
          onChange={handleInputChange}
          rows={4}
        />
        {/* Submit RMA Form */}
        <button type="submit" disabled={loadingForm}>
          {loadingForm ? "Submitting..." : "Submit RMA Form"}
        </button>
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

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  )
}

export default RmaForm
