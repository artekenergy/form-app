import React, { useState } from "react";
import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";
import RadioButton from "./RadioButton";
import TextArea from "./TextArea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxT6dWQHGYV7OjTOSVmEFqyHSEOgsiESXciv62ybhp4nhW-0SH50F0JLPweFQbBLGOakw/exec";

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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");
    setFormData((prevData) => {
      let data = { ...prevData };
      let current = data;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
      return data;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const urlEncodedData = new URLSearchParams();
  
      // Add the required "action" parameter
      urlEncodedData.append("action", "submitQuote");
  
      // Flatten and encode form data
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (typeof formData[key] === "object") {
            urlEncodedData.append(key, JSON.stringify(formData[key]));
          } else {
            urlEncodedData.append(key, formData[key]);
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
      });
  
      const responseText = await response.text();
      const responseData = JSON.parse(responseText);
  
      if (response.ok && responseData.status === "success") {
        toast.success("Form submitted successfully!");
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
        });
      } else {
        throw new Error(responseData.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Mobile Quotation Form</h1>
      <h2>PART I - General</h2>

      <TextInput
        label="First Name:"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />

      <TextInput
        label="Last Name:"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
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
        value={formData.email}
        onChange={handleInputChange}
      />

      <TextInput
        label="Phone:"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
      />

      <TextInput
        label="Shipping Street Address Line 1:"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleInputChange}
      />

      <TextInput
        label="Shipping Street Address Line 2:"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleInputChange}
      />

      <TextInput
        label="Shipping City:"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />

      <TextInput
        label="Shipping State:"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
      />

      <NumberInput
        label="Shipping Postal Code:"
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
        label="Electrical system design & components for DIY installation"
        name="services.diyInstallation"
        checked={formData.services.diyInstallation}
        onChange={handleInputChange}
      />

      <CheckboxInput
        label="Electrical system design & professional installation at Artek"
        name="services.professionalInstallation"
        checked={formData.services.professionalInstallation}
        onChange={handleInputChange}
      />

      <h3>Platform</h3>

      <TextInput
        label="Platform (Ex: van, RV, semi-truck, trailer, military, marine):"
        name="platform"
        value={formData.platform}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
      />

      {/* Conditionally show text input for each option */}
      {formData.application.applicationType === "commercial" && (
        <TextInput
          label="Please specify Commercial application:"
          name="application.commercialApplication"
          value={formData.application.commercialApplication}
          onChange={handleInputChange}
        />
      )}

      {formData.application.applicationType === "recreational" && (
        <TextInput
          label="Please specify Recreational application:"
          name="application.recreationalApplication"
          value={formData.application.recreationalApplication}
          onChange={handleInputChange}
        />
      )}

      {formData.application.applicationType === "other" && (
        <TextInput
          label="Please specify Other application:"
          name="application.otherApplication"
          value={formData.application.otherApplication}
          onChange={handleInputChange}
        />
      )}

      <h2>PART II - System Specifications</h2>

      <TextInput
        label="Vehicle year, make, model:"
        name="vehicleDetails.yearMakeModel"
        value={formData.vehicleDetails.yearMakeModel}
        onChange={handleInputChange}
      />

      <TextInput
        label="Vehicle engine type:"
        name="vehicleDetails.engineType"
        value={formData.vehicleDetails.engineType}
        onChange={handleInputChange}
      />

      <NumberInput
        label="How long would you prefer to be off-grid / without shore power? (days):"
        name="vehicleDetails.offGridDays"
        value={formData.vehicleDetails.offGridDays}
        onChange={handleInputChange}
      />

      <h3>High-draw appliances</h3>

      <CheckboxInput
        label="Air Conditioner"
        name="vehicleDetails.highDrawAppliances.airConditioner"
        checked={formData.vehicleDetails.highDrawAppliances.airConditioner}
        onChange={handleInputChange}
      />
      {formData.vehicleDetails.highDrawAppliances.airConditioner && (
        <TextInput
          label="Please specify the air conditioner make and model:"
          name="vehicleDetails.highDrawAppliances.airConditionerSpecs"
          value={formData.vehicleDetails.highDrawAppliances.airConditionerSpecs}
          onChange={handleInputChange}
        />
      )}

      <CheckboxInput
        label="Induction Cookstove"
        name="vehicleDetails.highDrawAppliances.inductionCookstove"
        checked={formData.vehicleDetails.highDrawAppliances.inductionCookstove}
        onChange={handleInputChange}
      />

      <CheckboxInput
        label="Microwave"
        name="vehicleDetails.highDrawAppliances.microwave"
        checked={formData.vehicleDetails.highDrawAppliances.microwave}
        onChange={handleInputChange}
      />

      <CheckboxInput
        label="Hair Dryer"
        name="vehicleDetails.highDrawAppliances.hairDryer"
        checked={formData.vehicleDetails.highDrawAppliances.hairDryer}
        onChange={handleInputChange}
      />

      <CheckboxInput
        label="Blender"
        name="vehicleDetails.highDrawAppliances.blender"
        checked={formData.vehicleDetails.highDrawAppliances.blender}
        onChange={handleInputChange}
      />

      <CheckboxInput
        label="Other"
        name="vehicleDetails.highDrawAppliances.otherAppliances"
        checked={formData.vehicleDetails.highDrawAppliances.otherAppliances}
        onChange={handleInputChange}
      />
      {formData.vehicleDetails.highDrawAppliances.otherAppliances && (
        <TextInput
          label="Please specify:"
          name="vehicleDetails.highDrawAppliances.other"
          value={formData.vehicleDetails.highDrawAppliances.other}
          onChange={handleInputChange}
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
        onChange={handleInputChange}
      />

      <RadioButton
        label="Do you have a generator?"
        name="hasGenerator"
        value={formData.hasGenerator}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        onChange={handleInputChange}
      />

      {/* Conditionally render generator make/model and transfer switch fields if "Yes" is selected */}
      {formData.hasGenerator === "yes" && (
        <>
          <TextInput
            label="Please specify the generator make and model:"
            name="generatorMakeModel"
            value={formData.generatorMakeModel}
            onChange={handleInputChange}
          />

          <RadioButton
            label="Does the generator have an automatic transfer switch?"
            name="hasAutoTransferSwitch"
            value={formData.hasAutoTransferSwitch}
            options={[
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" },
            ]}
            onChange={handleInputChange}
          />
        </>
      )}

      <h3>Solar</h3>

      {/* How much solar would you like to include? */}
      <NumberInput
        label="How much solar would you ideally like to include? (Watts)"
        name="solarAmount"
        value={formData.solarAmount}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
            onChange={handleInputChange}
          />

          {/* Text input for explanation */}
          <TextInput
            label="Please explain why you prefer this voltage:"
            name="preferredSystemVoltageExplanation"
            value={formData.preferredSystemVoltageExplanation}
            onChange={handleInputChange}
          />
        </>
      )}

      <h3>Other Preferences</h3>

      {/* Battery Bank Capacity */}
      <TextInput
        label="Do you have a preferred battery bank capacity (in Kw or Ah)?"
        name="batteryBankCapacity"
        value={formData.batteryBankCapacity}
        onChange={handleInputChange}
      />

      {/* Budget */}
      <TextInput
        label="What is your budget?"
        name="budget"
        value={formData.budget}
        onChange={handleInputChange}
      />

      {/* Timeline */}
      <TextInput
        label="What is your timeline?"
        name="timeline"
        value={formData.timeline}
        onChange={handleInputChange}
      />

      {/* Additional Details */}
      <TextArea
        label="Any other details you would like us to know?"
        name="additionalDetails"
        value={formData.additionalDetails}
        onChange={handleInputChange}
        rows={6} // You can adjust the number of rows for the textarea
      />

<button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default MobileQuoteForm;