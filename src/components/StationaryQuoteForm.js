import React, { useState } from "react"
import TextInput from "./TextInput"
import RadioButton from "./RadioButton"
import CheckboxInput from "./CheckboxInput"
import TextArea from "./TextArea"
import NumberInput from "./NumberInput"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzd2lXHWcf_OxzhH0qsutWGEHlBZH8WKnvslcSfZw7LaF4iTCt-wiChixN_PPHBEPxh/exec"

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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const keys = name.split(".")
    setFormData((prevData) => {
      let data = { ...prevData }
      let current = data
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = type === "checkbox" ? checked : value
      return data
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const urlEncodedData = new URLSearchParams()

      // Add the required "action" parameter
      urlEncodedData.append("action", "submitStationaryQuote")

      // Flatten and encode form data
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (typeof formData[key] === "object") {
            urlEncodedData.append(key, JSON.stringify(formData[key]))
          } else {
            urlEncodedData.append(key, formData[key])
          }
        }
      }

      // Send the POST request
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
        // Reset form state
        setFormData({
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
      } else {
        throw new Error(responseData.message || "Unknown error occurred.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit the form. Please try again.", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Stationary Quotation Form</h1>

      {/* General Information */}
      <h2>PART I - General Information</h2>
      <TextInput
        label="First Name:"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <p>
        <i>Required</i>
      </p>
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
      <p>
        <i>Required</i>
      </p>
      <TextInput
        label="Email:"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <p>
        <i>Required</i>
      </p>
      <TextInput
        label="Phone:"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <TextInput
        label="Shipping Address Line 1:"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleInputChange}
      />
      <TextInput
        label="City:"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />
      <TextInput
        label="State:"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
      />
      <NumberInput
        label="Postal Code:"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleInputChange}
      />
      <TextInput
        label="Country:"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
      />

      <h3>I am interested in a quote for the following service(s):</h3>
      <CheckboxInput
        label="DIY Installation"
        name="services.diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={handleInputChange}
      />
      <CheckboxInput
        label="Pre-wired Board by Artek"
        name="services.preWiredBoard"
        checked={formData.services.preWiredBoard}
        onChange={handleInputChange}
      />

      <h3>Platform</h3>
      <TextInput
        label="Platform (e.g., off-grid cabin, battery backup system, etc.):"
        name="platform"
        value={formData.platform}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
      />
      {formData.application.type === "commercial" && (
        <TextInput
          label="Please specify Commercial details:"
          name="application.commercialDetails"
          value={formData.application.commercialDetails}
          onChange={handleInputChange}
        />
      )}
      {formData.application.type === "recreational" && (
        <TextInput
          label="Please specify Recreational details:"
          name="application.recreationalDetails"
          value={formData.application.recreationalDetails}
          onChange={handleInputChange}
        />
      )}
      {formData.application.type === "other" && (
        <TextInput
          label="Please specify Other details:"
          name="application.otherDetails"
          value={formData.application.otherDetails}
          onChange={handleInputChange}
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
        onChange={handleInputChange}
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
          onChange={handleInputChange}
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
        onChange={handleInputChange}
      />

      <TextInput
        label="Inverter Capacity (e.g., 20 amp 240V supply):"
        name="system.inverterCapacity"
        value={formData.system.inverterCapacity}
        onChange={handleInputChange}
      />

      <h3>High-draw appliances</h3>
      <CheckboxInput
        label="Air Conditioner"
        name="system.highDrawAppliances.airConditioner"
        checked={formData.system.highDrawAppliances.airConditioner}
        onChange={handleInputChange}
      />
      {formData.system.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify make and model:"
          name="system.highDrawAppliances.airConditionerSpecs"
          value={formData.system.highDrawAppliances.airConditionerSpecs}
          onChange={handleInputChange}
        />
      )}
      <CheckboxInput
        label="Induction Cookstove"
        name="system.highDrawAppliances.inductionCookstove"
        checked={formData.system.highDrawAppliances.inductionCookstove}
        onChange={handleInputChange}
      />
      <CheckboxInput
        label="Microwave"
        name="system.highDrawAppliances.microwave"
        checked={formData.system.highDrawAppliances.microwave}
        onChange={handleInputChange}
      />
      <CheckboxInput
        label="Hair Dryer"
        name="system.highDrawAppliances.hairDryer"
        checked={formData.system.highDrawAppliances.hairDryer}
        onChange={handleInputChange}
      />
      <CheckboxInput
        label="Blender"
        name="system.highDrawAppliances.blender"
        checked={formData.system.highDrawAppliances.blender}
        onChange={handleInputChange}
      />
      <CheckboxInput
        label="Other"
        name="system.highDrawAppliances.otherAppliances"
        checked={formData.system.highDrawAppliances.otherAppliances}
        onChange={handleInputChange}
      />
      {formData.system.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="system.highDrawAppliances.other"
          value={formData.system.highDrawAppliances.other}
          onChange={handleInputChange}
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
        onChange={handleInputChange}
      />

      <RadioButton
        label="Do you have a generator?"
        name="system.generator.hasGenerator"
        value={formData.system.generator.hasGenerator}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleInputChange}
      />

      {formData.system.generator.hasGenerator === "yes" && (
        <>
          <TextInput
            label="Please specify the generator make and model:"
            name="system.generator.makeModel"
            value={formData.system.generator.makeModel}
            onChange={handleInputChange}
          />

          <RadioButton
            label="Does the generator have an automatic transfer switch?"
            name="system.generator.hasTransferSwitch"
            value={formData.system.generator.hasTransferSwitch}
            options={[
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" },
            ]}
            onChange={handleInputChange}
          />
        </>
      )}

      <h3>Solar</h3>
      <NumberInput
        label="How much solar would you ideally like to include? (Watts)"
        name="system.solarAmount"
        value={formData.system.solarAmount}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
      />
      <TextInput
        label="Please explain why you prefer this voltage:"
        name="system.preferredVoltageExplanation"
        value={formData.system.preferredVoltageExplanation}
        onChange={handleInputChange}
      />

      <TextInput
        label="Do you have a preferred battery bank capacity (in Kw or Ah)?"
        name="system.batteryBankCapacity"
        value={formData.system.batteryBankCapacity}
        onChange={handleInputChange}
      />

      <TextInput
        label="What is your budget?"
        name="system.budget"
        value={formData.system.budget}
        onChange={handleInputChange}
      />
      <TextInput
        label="What is your timeline?"
        name="system.timeline"
        value={formData.system.timeline}
        onChange={handleInputChange}
      />
      <TextArea
        label="Any other details you would like us to know?"
        name="system.additionalDetails"
        value={formData.system.additionalDetails}
        onChange={handleInputChange}
        rows={6}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <ToastContainer />
    </form>
  )
}

export default StationaryQuoteForm
