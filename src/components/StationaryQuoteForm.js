import React, { useState } from "react"
import TextInput from "./TextInput"
import CheckboxInput from "./CheckboxInput"
import NumberInput from "./NumberInput"
import RadioButton from "./RadioButton"
import TextArea from "./TextArea"

const StationaryQuoteForm = () => {
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
      preWiredBoard: false,
    },
    platform: "",
    application: {
      type: "",
      commercialDetails: "",
      recreationalDetails: "",
      otherDetails: "",
    },
    system: {
      systemType: "",
      requiresPermitting: "",
      systemVoltage: "",
      inverterCapacity: "",
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
      highDrawAppliancesSimultaneous: "",
      generator: {
        hasGenerator: "",
        makeModel: "",
        hasTransferSwitch: "",
      },
      solarAmount: "",
      solarMount: "",
      preferredVoltage: "",
      preferredVoltageExplanation: "",
      batteryBankCapacity: "",
      budget: "",
      timeline: "",
      additionalDetails: "",
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const proxyUrlStationary =
      "https://pure-escarpment-89857-457aa3cad0c8.herokuapp.com/"
    const googleScriptUrlStationary =
      "https://script.google.com/macros/s/AKfycbwwiqjp2CfxGd6cfz8Zjue3thTyEVVMlHSLsOgNykTHAtN0n4iO53V_eJ8hy2mTmNMS/exec"
    const proxiedGoogleScriptUrlStationary =
      proxyUrlStationary + googleScriptUrlStationary

    const dataToSend = {
      ...formData,
      formType: "stationaryQuote", // Add a form identifier
    }

    try {
      console.log("Submitting form data:", dataToSend)

      const response = await fetch(proxiedGoogleScriptUrlStationary, {
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
      <h1>Stationary Quotation Form</h1>
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
        label="Shipping State (Suffix):"
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
        label="DIY Installation"
        name="services.diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Pre-wired Board by Artek"
        name="services.preWiredBoard"
        checked={formData.services.preWiredBoard}
        onChange={handleChange}
      />

      <h3>Platform</h3>
      <TextInput
        label="Platform (e.g., off-grid cabin, battery backup system, etc.):"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
      />

      <h3>Application</h3>
      <RadioButton
        label="Application Type"
        name="application.type"
        value={formData.application.type}
        options={[
          { label: "Commercial", value: "commercial" },
          { label: "Recreational", value: "recreational" },
          { label: "Other", value: "other" },
        ]}
        onChange={handleChange}
      />
      {formData.application.type === "commercial" && (
        <TextInput
          label="Please specify Commercial details:"
          name="application.commercialDetails"
          value={formData.application.commercialDetails}
          onChange={handleChange}
        />
      )}
      {formData.application.type === "recreational" && (
        <TextInput
          label="Please specify Recreational details:"
          name="application.recreationalDetails"
          value={formData.application.recreationalDetails}
          onChange={handleChange}
        />
      )}
      {formData.application.type === "other" && (
        <TextInput
          label="Please specify Other details:"
          name="application.otherDetails"
          value={formData.application.otherDetails}
          onChange={handleChange}
        />
      )}

      <h2>PART II - System Specifications</h2>
      <RadioButton
        label="System Type"
        name="system.systemType"
        value={formData.system.systemType}
        options={[
          { label: "Off-grid", value: "offGrid" },
          { label: "Grid-tied", value: "gridTied" },
        ]}
        onChange={handleChange}
      />
      {formData.system.systemType === "gridTied" && (
        <RadioButton
          label="Does the system require permitting?"
          name="system.requiresPermitting"
          value={formData.system.requiresPermitting}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={handleChange}
        />
      )}

      <RadioButton
        label="System Voltage"
        name="system.systemVoltage"
        value={formData.system.systemVoltage}
        options={[
          { label: "120V", value: "120V" },
          { label: "240V", value: "240V" },
          { label: "3 phase 208V", value: "208V" },
          { label: "3 phase 480V", value: "480V" },
        ]}
        onChange={handleChange}
      />

      <TextInput
        label="Inverter Capacity (e.g., 20 amp 240V supply):"
        name="system.inverterCapacity"
        value={formData.system.inverterCapacity}
        onChange={handleChange}
      />

      <h3>High-draw appliances</h3>
      <CheckboxInput
        label="Air Conditioner"
        name="system.highDrawAppliances.airConditioner"
        checked={formData.system.highDrawAppliances.airConditioner}
        onChange={handleChange}
      />
      {formData.system.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify make and model:"
          name="system.highDrawAppliances.airConditionerSpecs"
          value={formData.system.highDrawAppliances.airConditionerSpecs}
          onChange={handleChange}
        />
      )}
      <CheckboxInput
        label="Induction Cookstove"
        name="system.highDrawAppliances.inductionCookstove"
        checked={formData.system.highDrawAppliances.inductionCookstove}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Microwave"
        name="system.highDrawAppliances.microwave"
        checked={formData.system.highDrawAppliances.microwave}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Hair Dryer"
        name="system.highDrawAppliances.hairDryer"
        checked={formData.system.highDrawAppliances.hairDryer}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Blender"
        name="system.highDrawAppliances.blender"
        checked={formData.system.highDrawAppliances.blender}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Other"
        name="system.highDrawAppliances.otherAppliances"
        checked={formData.system.highDrawAppliances.otherAppliances}
        onChange={handleChange}
      />
      {formData.system.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="system.highDrawAppliances.other"
          value={formData.system.highDrawAppliances.other}
          onChange={handleChange}
        />
      )}
      <RadioButton
        label="Do you want to be able to use multiple high-draw appliances on high at the same time?"
        name="system.highDrawAppliancesSimultaneous"
        value={formData.system.highDrawAppliancesSimultaneous}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleChange}
      />

      <RadioButton
        label="Do you have a generator?"
        name="system.generator.hasGenerator"
        value={formData.system.generator.hasGenerator}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleChange}
      />

      {formData.system.generator.hasGenerator === "yes" && (
        <>
          <TextInput
            label="Please specify the generator make and model:"
            name="system.generator.makeModel"
            value={formData.system.generator.makeModel}
            onChange={handleChange}
          />

          <RadioButton
            label="Does the generator have an automatic transfer switch?"
            name="system.generator.hasTransferSwitch"
            value={formData.system.generator.hasTransferSwitch}
            options={[
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" },
            ]}
            onChange={handleChange}
          />
        </>
      )}

      <h3>Solar</h3>
      <NumberInput
        label="How much solar would you ideally like to include? (Watts)"
        name="system.solarAmount"
        value={formData.system.solarAmount}
        onChange={handleChange}
      />
      <RadioButton
        label="What type of solar mount do you prefer?"
        name="system.solarMount"
        value={formData.system.solarMount}
        options={[
          { label: "Roof mount", value: "roof" },
          { label: "Ground mount", value: "ground" },
          { label: "Both", value: "both" },
        ]}
        onChange={handleChange}
      />

      <h3>System Voltage</h3>
      <RadioButton
        label="Do you have a preferred system voltage?"
        name="system.preferredVoltage"
        value={formData.system.preferredVoltage}
        options={[
          { label: "12V", value: "12V" },
          { label: "24V", value: "24V" },
          { label: "48V", value: "48V" },
        ]}
        onChange={handleChange}
      />
      <TextInput
        label="Please explain why you prefer this voltage:"
        name="system.preferredVoltageExplanation"
        value={formData.system.preferredVoltageExplanation}
        onChange={handleChange}
      />

      <TextInput
        label="Do you have a preferred battery bank capacity (in Kw or Ah)?"
        name="system.batteryBankCapacity"
        value={formData.system.batteryBankCapacity}
        onChange={handleChange}
      />

      <TextInput
        label="What is your budget?"
        name="system.budget"
        value={formData.system.budget}
        onChange={handleChange}
      />
      <TextInput
        label="What is your timeline?"
        name="system.timeline"
        value={formData.system.timeline}
        onChange={handleChange}
      />
      <TextArea
        label="Any other details you would like us to know?"
        name="system.additionalDetails"
        value={formData.system.additionalDetails}
        onChange={handleChange}
        rows={6}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default StationaryQuoteForm
