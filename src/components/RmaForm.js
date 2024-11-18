// RmaForm.js
import React, { useState } from "react";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import CheckboxInput from "./CheckboxInput";
import TextArea from "./TextArea";
import IFrame from "./IFrame";
import FileUpload from "./FileUpload"; // Ensure this component correctly calls onFileChange with the selected file
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  });

  const [selectedFile, setSelectedFile] = useState(null); // State for the uploaded file
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file selection
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  // Handle Form Submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    // Frontend validation (optional but recommended)
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.");
      setLoadingForm(false);
      return;
    }

    try {
      // Prepare FormData for form submission
      const formDataPayload = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        formDataPayload.append(key, formData[key]);
      });

      // Append an action identifier
      formDataPayload.append("action", "submitForm");

      // Send form data to GAS
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwhcHILKH1Oky3UrtaSZyKrUIteqlHI1nnbpOSnyX310EbNKIuR5zax_it7in0mTAym/exec"; // Replace with your actual Web App URL

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        body: formDataPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          toast.success("Form submitted successfully!");
          // Reset the form
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
          });
        } else {
          const errorMsg = responseData.message || "Unknown error.";
          toast.error("Form submission failed: " + errorMsg);
        }
      } else {
        // Attempt to parse error message from response
        let errorMessage = "An unknown error occurred.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          // Parsing failed, keep default message
        }
        toast.error(`Error submitting the form: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoadingForm(false);
    }
  };

  // Handle File Upload
  const handleUploadFile = async (e) => {
    e.preventDefault();
    setLoadingUpload(true);

    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      setLoadingUpload(false);
      return;
    }

    try {
      // Prepare FormData for file upload
      const formDataPayload = new FormData();

      // Append the file
      formDataPayload.append("uploadedFile", selectedFile, selectedFile.name);

      // Append an action identifier
      formDataPayload.append("action", "uploadFile");

      // Send file to GAS
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwhcHILKH1Oky3UrtaSZyKrUIteqlHI1nnbpOSnyX310EbNKIuR5zax_it7in0mTAym/exec"; // Same Web App URL as form submissi



      const response = await fetch(googleScriptUrl, {
        method: "POST",
        body: formDataPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          toast.success("File uploaded successfully!");
          setSelectedFile(null);
        } else {
          const errorMsg = responseData.message || "Unknown error.";
          toast.error("File upload failed: " + errorMsg);
        }
      } else {
        toast.error("Error uploading the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setLoadingUpload(false);
    }
  };

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
          need to complete the associated form. Once the form is completed online,
          download the completed form as a PDF and attach it below.
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



        <FileUpload onFileChange={handleFileChange} selectedFile={selectedFile} />
        <br />

        <button type="submit" disabled={loadingUpload}>
          {loadingUpload ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default RmaForm;