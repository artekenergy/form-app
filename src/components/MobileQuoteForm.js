import React, { useState } from "react"
import TextInput from "./TextInput"
import CheckboxInput from "./CheckboxInput"
import NumberInput from "./NumberInput"
import RadioButton from "./RadioButton"
import TextArea from "./TextArea"

const MobileQuoteForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    services: {
      diyInstallation: false,
      professionalInstallation: false,
    },
    platform: "",
    application: {
      applicationType: "",
      commercialApplication: "",
      recreationalApplication: "",
      otherApplication: "",
    },
    vehicleDetails: {
      yearMakeModel: "",
      engineType: "",
      offGridDays: "",
      highDrawAppliances: {
        airConditioner: false,
        airConditionerSpecs: "",
        inductionCookstove: false,
        microwave: false,
        hairDryer: false,
        blender: false,
        otherAppliances: false,
        other: "",
      },
    },
    highDrawAppsSimultaneously: "",
    hasGenerator: "",
    generatorMakeModel: "",
    hasAutoTransferSwitch: "",
    solarAmount: "",
    solarType: "",
    shorePower: "",
    has240VLoads: "",
    preferredSystemVoltage: "",
    specifiedVoltage: "",
    preferredSystemVoltageExplanation: "",
    batteryBankCapacity: "",
    budget: "",
    timeline: "",
    additionalDetails: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const proxyUrlMobile =
      "https://pure-escarpment-89857-457aa3cad0c8.herokuapp.com/"
    const googleScriptUrlMobile =
      "https://script.google.com/macros/s/AKfycbzbIXbydKLevpPvmEpKYhYKK1RmavShBfbS8KOht1KbeVmcx45uTIwV2n_fWVI5xpkNDg/exec"
    const proxiedGoogleScriptUrlMobile = proxyUrlMobile + googleScriptUrlMobile

    const dataToSend = {
      ...formData,
      formType: "mobileQuote", // Add a form identifier
    }

    try {
      console.log("Submitting form data:", dataToSend)

      const response = await fetch(proxiedGoogleScriptUrlMobile, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    const keys = name.split(".")
    setFormData((prevFormData) => {
      let data = { ...prevFormData }
      let current = data
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = type === "checkbox" ? checked : value
      return data
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Mobile Quotation Form</h1>
      <h2>PART I - General</h2>

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
        label="Shipping Street Address Line 1:"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
      />

      <TextInput
        label="Shipping Street Address Line 2:"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
      />

      <TextInput
        label="Shipping City:"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />

      <TextInput
        label="Shipping State:"
        name="state"
        value={formData.state}
        onChange={handleChange}
      />

      <NumberInput
        label="Shipping Postal Code:"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
      />

      <TextInput
        label="Country:"
        name="country"
        value={formData.country}
        onChange={handleChange}
      />

      <h3>I am interested in a quote for the following service(s):</h3>

      <CheckboxInput
        label="Electrical system design & components for DIY installation"
        name="services.diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={handleChange}
      />

      <CheckboxInput
        label="Electrical system design & professional installation at Artek"
        name="services.professionalInstallation"
        checked={formData.services.professionalInstallation}
        onChange={handleChange}
      />

      <h3>Platform</h3>

      <TextInput
        label="Platform (Ex: van, RV, semi-truck, trailer, military, marine):"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
      />

      <h3>Application</h3>

      <RadioButton
        name="application.applicationType"
        value={formData.application.applicationType}
        options={[
          { label: "Commercial", value: "commercial" },
          { label: "Recreational", value: "recreational" },
          { label: "Other", value: "other" },
        ]}
        onChange={handleChange}
      />

      {/* Conditionally show text input for each option */}
      {formData.application.applicationType === "commercial" && (
        <TextInput
          label="Please specify Commercial application:"
          name="application.commercialApplication"
          value={formData.application.commercialApplication}
          onChange={handleChange}
        />
      )}

      {formData.application.applicationType === "recreational" && (
        <TextInput
          label="Please specify Recreational application:"
          name="application.recreationalApplication"
          value={formData.application.recreationalApplication}
          onChange={handleChange}
        />
      )}

      {formData.application.applicationType === "other" && (
        <TextInput
          label="Please specify Other application:"
          name="application.otherApplication"
          value={formData.application.otherApplication}
          onChange={handleChange}
        />
      )}

      <h2>PART II - System Specifications</h2>

      <TextInput
        label="Vehicle year, make, model:"
        name="vehicleDetails.yearMakeModel"
        value={formData.vehicleDetails.yearMakeModel}
        onChange={handleChange}
      />

      <TextInput
        label="Vehicle engine type:"
        name="vehicleDetails.engineType"
        value={formData.vehicleDetails.engineType}
        onChange={handleChange}
      />

      <NumberInput
        label="How long would you prefer to be off-grid / without shore power? (days):"
        name="vehicleDetails.offGridDays"
        value={formData.vehicleDetails.offGridDays}
        onChange={handleChange}
      />

      <h3>High-draw appliances</h3>

      <CheckboxInput
        label="Air Conditioner"
        name="vehicleDetails.highDrawAppliances.airConditioner"
        checked={formData.vehicleDetails.highDrawAppliances.airConditioner}
        onChange={handleChange}
      />
      {formData.vehicleDetails.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify the air conditioner make and model:"
          name="vehicleDetails.highDrawAppliances.airConditionerSpecs"
          value={formData.vehicleDetails.highDrawAppliances.airConditionerSpecs}
          onChange={handleChange}
        />
      )}

      <CheckboxInput
        label="Induction Cookstove"
        name="vehicleDetails.highDrawAppliances.inductionCookstove"
        checked={formData.vehicleDetails.highDrawAppliances.inductionCookstove}
        onChange={handleChange}
      />

      <CheckboxInput
        label="Microwave"
        name="vehicleDetails.highDrawAppliances.microwave"
        checked={formData.vehicleDetails.highDrawAppliances.microwave}
        onChange={handleChange}
      />

      <CheckboxInput
        label="Hair Dryer"
        name="vehicleDetails.highDrawAppliances.hairDryer"
        checked={formData.vehicleDetails.highDrawAppliances.hairDryer}
        onChange={handleChange}
      />

      <CheckboxInput
        label="Blender"
        name="vehicleDetails.highDrawAppliances.blender"
        checked={formData.vehicleDetails.highDrawAppliances.blender}
        onChange={handleChange}
      />

      <CheckboxInput
        label="Other"
        name="vehicleDetails.highDrawAppliances.otherAppliances"
        checked={formData.vehicleDetails.highDrawAppliances.otherAppliances}
        onChange={handleChange}
      />
      {formData.vehicleDetails.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="vehicleDetails.highDrawAppliances.other"
          value={formData.vehicleDetails.highDrawAppliances.other}
          onChange={handleChange}
        />
      )}

      <RadioButton
        label="Do you want to be able to use multiple high-draw appliances on high at the same time?"
        name="highDrawAppsSimultaneously"
        value={formData.highDrawAppsSimultaneously}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleChange}
      />

      <RadioButton
        label="Do you have a generator?"
        name="hasGenerator"
        value={formData.hasGenerator}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleChange}
      />

      {/* Conditionally render generator make/model and transfer switch fields if "Yes" is selected */}
      {formData.hasGenerator === "yes" && (
        <>
          <TextInput
            label="Please specify the generator make and model:"
            name="generatorMakeModel"
            value={formData.generatorMakeModel}
            onChange={handleChange}
          />

          <RadioButton
            label="Does the generator have an automatic transfer switch?"
            name="hasAutoTransferSwitch"
            value={formData.hasAutoTransferSwitch}
            options={[
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" },
            ]}
            onChange={handleChange}
          />
        </>
      )}

      <h3>Solar</h3>

      {/* How much solar would you like to include? */}
      <NumberInput
        label="How much solar would you ideally like to include? (Watts)"
        name="solarAmount"
        value={formData.solarAmount}
        onChange={handleChange}
      />

      {/* Solar Type: Roof mount, Deployable, or Both */}
      <RadioButton
        label="What type of solar mount do you prefer?"
        name="solarType"
        value={formData.solarType}
        options={[
          { label: "Roof mount", value: "roof" },
          { label: "Deployable", value: "deployable" },
          { label: "Both", value: "both" },
        ]}
        onChange={handleChange}
      />

      <h3>Shore Power Preferences</h3>

      {/* Shore Power Connection */}
      <RadioButton
        label="What is your shore power connection?"
        name="shorePower"
        value={formData.shorePower}
        options={[
          { label: "15A", value: "15A" },
          { label: "30A", value: "30A" },
          { label: "50A", value: "50A" },
        ]}
        onChange={handleChange}
      />

      {/* 240V Loads Question */}
      <RadioButton
        label="Do you have 240V loads?"
        name="has240VLoads"
        value={formData.has240VLoads}
        options={[
          { label: "No", value: "no" },
          { label: "Yes", value: "yes" },
        ]}
        onChange={handleChange}
      />

      <h3>System Voltage</h3>

      {/* Preferred System Voltage */}
      <RadioButton
        label="Do you have a preferred system voltage?"
        name="preferredSystemVoltage"
        value={formData.preferredSystemVoltage}
        options={[
          { label: "No", value: "no" },
          { label: "Yes", value: "yes" },
        ]}
        onChange={handleChange}
      />

      {/* Show Voltage Specification and Explanation if "Yes" is selected */}
      {formData.preferredSystemVoltage === "yes" && (
        <>
          {/* Radio Button to specify 12V, 24V, or 48V */}
          <RadioButton
            label="Specify the system voltage:"
            name="specifiedVoltage"
            value={formData.specifiedVoltage}
            options={[
              { label: "12V", value: "12V" },
              { label: "24V", value: "24V" },
              { label: "48V", value: "48V" },
            ]}
            onChange={handleChange}
          />

          {/* Text input for explanation */}
          <TextInput
            label="Please explain why you prefer this voltage:"
            name="preferredSystemVoltageExplanation"
            value={formData.preferredSystemVoltageExplanation}
            onChange={handleChange}
          />
        </>
      )}

      <h3>Other Preferences</h3>

      {/* Battery Bank Capacity */}
      <TextInput
        label="Do you have a preferred battery bank capacity (in Kw or Ah)?"
        name="batteryBankCapacity"
        value={formData.batteryBankCapacity}
        onChange={handleChange}
      />

      {/* Budget */}
      <TextInput
        label="What is your budget?"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
      />

      {/* Timeline */}
      <TextInput
        label="What is your timeline?"
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
      />

      {/* Additional Details */}
      <TextArea
        label="Any other details you would like us to know?"
        name="additionalDetails"
        value={formData.additionalDetails}
        onChange={handleChange}
        rows={6} // You can adjust the number of rows for the textarea
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default MobileQuoteForm
