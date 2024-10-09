import React, { useState } from "react"
import TextInput from "./TextInput"
import RadioButton from "./RadioButton"
import CheckboxInput from "./CheckboxInput"
import TextArea from "./TextArea"

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const proxyUrl = "https://pure-escarpment-89857-457aa3cad0c8.herokuapp.com/"
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbzbIXbydKLevpPvmEpKYhYKK1RmavShBfbS8KOht1KbeVmcx45uTIwV2n_fWVI5xpkNDg/exec"
    const proxiedGoogleScriptUrl = proxyUrl + googleScriptUrl

    const dataToSend = {
      ...formData,
      formType: "rmaForm", // Add a form identifier
    }

    try {
      const response = await fetch(proxiedGoogleScriptUrl, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        alert("Form submitted successfully!")
      } else {
        alert("Error submitting the form.")
      }
    } catch (error) {
      console.error("Error submitting form: ", error)
      alert("Error submitting the form.")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>PART I - Contact</h2>

      <TextInput
        label="First Name:"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <TextInput
        label="Last Name:"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <TextInput
        label="Company:"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      <TextInput
        label="Email:"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextInput
        label="Phone:"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <TextInput
        label="Shipping Address:"
        name="shippingAddress"
        value={formData.shippingAddress}
        onChange={handleChange}
      />

      <CheckboxInput
        label="I acknowledge that Artek does not cover shipping costs for replacement products or shipping to and from repair centers."
        name="acknowledgeShippingCosts"
        checked={formData.acknowledgeShippingCosts}
        onChange={handleChange}
      />

      <h2>PART II - Product Information</h2>

      <TextInput
        label="Serial Number (beginning in HQ):"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
      />

      <TextInput
        label="Installation Date (MM/DD/YY):"
        name="installationDate"
        value={formData.installationDate}
        onChange={handleChange}
      />

      <TextInput
        label="Failure Date (MM/DD/YY):"
        name="failureDate"
        value={formData.failureDate}
        onChange={handleChange}
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
        onChange={handleChange}
      />

      {formData.firmwareUpdated === "yes" && (
        <TextInput
          label="Specify Firmware Version:"
          name="firmwareVersion"
          value={formData.firmwareVersion}
          onChange={handleChange}
        />
      )}

      <TextArea
        label="Brief description of failure:"
        name="failureDescription"
        value={formData.failureDescription}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit">Submit RMA Request</button>
    </form>
  )
}

export default RmaForm
