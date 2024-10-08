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
      commercialCheckbox: false, // Added checkboxes
      commercial: "",
      recreationalCheckbox: false,
      recreational: "",
      otherCheckbox: false,
      other: "",
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
        otherAppliances: false, // Added otherAppliances checkbox
        other: "",
      },
    },
    highDrawAppsSimultaneously: "", // Added simultaneous high-draw appliances question
    hasGenerator: "", // Added generator field
    generatorMakeModel: "", // Added generator make/model
    hasAutoTransferSwitch: "", // Added auto transfer switch field
    solarAmount: "", // Added solar amount
    solarType: "", // Added solar type field
    shorePower: "", // Added shore power field
    has240VLoads: "", // Added 240V loads field
    preferredSystemVoltage: "", // Added preferred system voltage field
    specifiedVoltage: "", // Added specified voltage (12V, 24V, 48V)
    preferredSystemVoltageExplanation: "", // Added explanation for voltage
    batteryBankCapacity: "", // Added battery bank capacity
    budget: "", // Added budget field
    timeline: "", // Added timeline field
    additionalDetails: "", // Added additional details
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbzbIXbydKLevpPvmEpKYhYKK1RmavShBfbS8KOht1KbeVmcx45uTIwV2n_fWVI5xpkNDg/exec"

    try {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        mode: "cors", // This ensures that the browser expects CORS headers in the response
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data
      })

      const result = await response.json()
      if (result.status === "success") {
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
        name="diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={(e) =>
          setFormData({
            ...formData,
            services: {
              ...formData.services,
              diyInstallation: e.target.checked,
            },
          })
        }
      />

      <CheckboxInput
        label="Electrical system design & professional installation at Artek"
        name="professionalInstallation"
        checked={formData.services.professionalInstallation}
        onChange={(e) =>
          setFormData({
            ...formData,
            services: {
              ...formData.services,
              professionalInstallation: e.target.checked,
            },
          })
        }
      />

      <h3>Platform</h3>

      <TextInput
        label="Platform (Ex: van, RV, semi-truck, trailer, military, marine):"
        name="platform"
        value={formData.platform}
        onChange={handleChange}
      />

      <h3>Application</h3>

      {/* Commercial */}
      <CheckboxInput
        label="Commercial"
        name="commercialCheckbox"
        checked={formData.application.commercialCheckbox}
        onChange={(e) =>
          setFormData({
            ...formData,
            application: {
              ...formData.application,
              commercialCheckbox: e.target.checked,
            },
          })
        }
      />
      {formData.application.commercialCheckbox && (
        <TextInput
          label="Please specify:"
          name="commercial"
          value={formData.application.commercial}
          onChange={handleChange}
        />
      )}

      {/* Recreational */}
      <CheckboxInput
        label="Recreational"
        name="recreationalCheckbox"
        checked={formData.application.recreationalCheckbox}
        onChange={(e) =>
          setFormData({
            ...formData,
            application: {
              ...formData.application,
              recreationalCheckbox: e.target.checked,
            },
          })
        }
      />
      {formData.application.recreationalCheckbox && (
        <TextInput
          label="Please specify:"
          name="recreational"
          value={formData.application.recreational}
          onChange={handleChange}
        />
      )}

      {/* Other */}
      <CheckboxInput
        label="Other"
        name="otherCheckbox"
        checked={formData.application.otherCheckbox}
        onChange={(e) =>
          setFormData({
            ...formData,
            application: {
              ...formData.application,
              otherCheckbox: e.target.checked,
            },
          })
        }
      />
      {formData.application.otherCheckbox && (
        <TextInput
          label="Please specify:"
          name="other"
          value={formData.application.other}
          onChange={handleChange}
        />
      )}

      <h2>PART II - System Specifications</h2>

      <TextInput
        label="Vehicle year, make, model:"
        name="yearMakeModel"
        value={formData.vehicleDetails.yearMakeModel}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              yearMakeModel: e.target.value,
            },
          })
        }
      />

      <TextInput
        label="Vehicle engine type:"
        name="engineType"
        value={formData.vehicleDetails.engineType}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              engineType: e.target.value,
            },
          })
        }
      />

      <NumberInput
        label="How long would you prefer to be off-grid / without shore power? (days):"
        name="offGridDays"
        value={formData.vehicleDetails.offGridDays}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              offGridDays: e.target.value,
            },
          })
        }
      />

      <h3>High-draw appliances</h3>

      <CheckboxInput
        label="Air Conditioner"
        name="airConditioner"
        checked={formData.vehicleDetails.highDrawAppliances.airConditioner}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                airConditioner: e.target.checked,
              },
            },
          })
        }
      />
      {formData.vehicleDetails.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify the air conditioner make and model:"
          name="airConditionerSpecs"
          value={formData.vehicleDetails.highDrawAppliances.airConditionerSpecs}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                highDrawAppliances: {
                  ...formData.vehicleDetails.highDrawAppliances,
                  airConditionerSpecs: e.target.value,
                },
              },
            })
          }
        />
      )}

      <CheckboxInput
        label="Induction Cookstove"
        name="inductionCookstove"
        checked={formData.vehicleDetails.highDrawAppliances.inductionCookstove}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                inductionCookstove: e.target.checked,
              },
            },
          })
        }
      />

      <CheckboxInput
        label="Microwave"
        name="microwave"
        checked={formData.vehicleDetails.highDrawAppliances.microwave}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                microwave: e.target.checked,
              },
            },
          })
        }
      />

      <CheckboxInput
        label="Hair Dryer"
        name="hairDryer"
        checked={formData.vehicleDetails.highDrawAppliances.hairDryer}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                hairDryer: e.target.checked,
              },
            },
          })
        }
      />

      <CheckboxInput
        label="Blender"
        name="blender"
        checked={formData.vehicleDetails.highDrawAppliances.blender}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                blender: e.target.checked,
              },
            },
          })
        }
      />

      <CheckboxInput
        label="Other"
        name="otherAppliances"
        checked={formData.vehicleDetails.highDrawAppliances.otherAppliances}
        onChange={(e) =>
          setFormData({
            ...formData,
            vehicleDetails: {
              ...formData.vehicleDetails,
              highDrawAppliances: {
                ...formData.vehicleDetails.highDrawAppliances,
                otherAppliances: e.target.checked,
              },
            },
          })
        }
      />
      {formData.vehicleDetails.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="otherAppliancesSpecs"
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
