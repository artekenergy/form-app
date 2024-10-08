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
      offGrid: false,
      gridTied: false,
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const googleScriptUrl =
      "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

    try {
      const response = await fetch(googleScriptUrl, {
        redirect: "follow", // Important to follow redirects for Google Apps Script
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Use text/plain as per the workaround
        },
        body: JSON.stringify(formData), // Send form data
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

  return (
    <form onSubmit={handleSubmit}>
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
        name="diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Pre-wired Board by Artek"
        name="preWiredBoard"
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
          name="commercialDetails"
          value={formData.application.commercialDetails}
          onChange={handleChange}
        />
      )}
      {formData.application.type === "recreational" && (
        <TextInput
          label="Please specify Recreational details:"
          name="recreationalDetails"
          value={formData.application.recreationalDetails}
          onChange={handleChange}
        />
      )}
      {formData.application.type === "other" && (
        <TextInput
          label="Please specify Other details:"
          name="otherDetails"
          value={formData.application.otherDetails}
          onChange={handleChange}
        />
      )}

      <h2>PART II - System Specifications</h2>
      <RadioButton
        label="System Type"
        name="system.offGrid"
        value={formData.system.offGrid}
        options={[
          { label: "Off-grid", value: "offGrid" },
          { label: "Grid-tied", value: "gridTied" },
        ]}
        onChange={handleChange}
      />
      {formData.system.gridTied && (
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
        name="airConditioner"
        checked={formData.system.highDrawAppliances.airConditioner}
        onChange={handleChange}
      />
      {formData.system.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify make and model:"
          name="airConditionerSpecs"
          value={formData.system.highDrawAppliances.airConditionerSpecs}
          onChange={handleChange}
        />
      )}
      <CheckboxInput
        label="Induction Cookstove"
        name="inductionCookstove"
        checked={formData.system.highDrawAppliances.inductionCookstove}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Microwave"
        name="microwave"
        checked={formData.system.highDrawAppliances.microwave}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Hair Dryer"
        name="hairDryer"
        checked={formData.system.highDrawAppliances.hairDryer}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Blender"
        name="blender"
        checked={formData.system.highDrawAppliances.blender}
        onChange={handleChange}
      />
      <CheckboxInput
        label="Other"
        name="otherAppliances"
        checked={formData.system.highDrawAppliances.otherAppliances}
        onChange={handleChange}
      />
      {formData.system.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="otherAppliancesSpecs"
          value={formData.system.highDrawAppliances.other}
          onChange={handleChange}
        />
      )}
      <RadioButton
        label="Do you want to be able to use multiple high-draw appliances on high at the same time?"
        name="highDrawAppliancesSimultaneous"
        value={formData.system.highDrawAppliancesSimultaneous}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleChange}
      />

      <RadioButton
        label="Do you have a generator?"
        name="generator.hasGenerator"
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
            name="generator.makeModel"
            value={formData.system.generator.makeModel}
            onChange={handleChange}
          />

          <RadioButton
            label="Does the generator have an automatic transfer switch?"
            name="generator.hasTransferSwitch"
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
        name="solarAmount"
        value={formData.system.solarAmount}
        onChange={handleChange}
      />
      <RadioButton
        label="What type of solar mount do you prefer?"
        name="solarMount"
        value={formData.system.solarMount}
        options={[
          { label: "Roof mount", value: "roof" },
          { label: "Deployable", value: "deployable" },
          { label: "Both", value: "both" },
        ]}
        onChange={handleChange}
      />

      <h3>System Voltage</h3>
      <RadioButton
        label="Do you have a preferred system voltage?"
        name="preferredVoltage"
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
        name="preferredVoltageExplanation"
        value={formData.system.preferredVoltageExplanation}
        onChange={handleChange}
      />

      <TextInput
        label="Do you have a preferred battery bank capacity (in Kw or Ah)?"
        name="batteryBankCapacity"
        value={formData.system.batteryBankCapacity}
        onChange={handleChange}
      />

      <TextInput
        label="What is your budget?"
        name="budget"
        value={formData.system.budget}
        onChange={handleChange}
      />
      <TextInput
        label="What is your timeline?"
        name="timeline"
        value={formData.system.timeline}
        onChange={handleChange}
      />
      <TextArea
        label="Any other details you would like us to know?"
        name="additionalDetails"
        value={formData.system.additionalDetails}
        onChange={handleChange}
        rows={6}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default StationaryQuoteForm
