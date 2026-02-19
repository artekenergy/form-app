import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import CheckboxInput from "./CheckboxInput";
import TextArea from "./TextArea";
import IFrame from "./IFrame";
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxl09P_RaT91nIapUqAlrVPpGYEU4gAwbiUBnw4e3zwcCxMJiMugg5xOrzOkf9VLbdX/exec";

const RmaForm = () => {
  const generateRmaNumber = () => {
    const now = new Date();
    const date = now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RMA-${date}-${random}`;
  };

  const [rmaNumber] = useState(generateRmaNumber);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    shippingAddress: "",
    artekOrderNumber: "",
    productSku: "",
    serialNumber: "",
    manufacturer: "",
    installationDate: "",
    failureDate: "",
    firmwareUpdated: "",
    firmwareVersion: "",
    failureDescription: "",
    acknowledgeShippingCosts: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isVictronProduct, setIsVictronProduct] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    try {
      // Remove the file validation check that was here

      // Prepare form data
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("action", "submitAndUpload"); // Ensure action matches backend
      urlEncodedData.append("rmaNumber", rmaNumber); // Include auto-generated RMA number
      urlEncodedData.append("isVictronProduct", isVictronProduct); // Include Victron product selections
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          // Auto-fill manufacturer as "Victron Energy" when user selected yes
          if (key === "manufacturer" && isVictronProduct === "yes") {
            urlEncodedData.append(key, "Victron Energy");
          } else {
            urlEncodedData.append(key, formData[key]);
          }
        }
      }

      // Only process file data if a file was selected
      if (selectedFile) {
        // Read the file as Base64
        const fileBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            const base64String = reader.result.split(",")[1]; // Remove the Data URL prefix
            resolve(base64String);
          };
          reader.onerror = (error) => reject(error);
        });

        urlEncodedData.append("fileName", selectedFile.name); // Include file name
        urlEncodedData.append("fileType", selectedFile.type); // Include file type
        urlEncodedData.append("fileData", fileBase64); // Include Base64 encoded file data
      } else {
        // Indicate no file was uploaded
        urlEncodedData.append("fileUploaded", "false");
      }

      // Send data to GAS
      const response = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: urlEncodedData.toString(),
        mode: "cors", // Ensure CORS mode is set
      });

      const responseText = await response.text();
      const responseData = JSON.parse(responseText);

      if (response.ok && responseData.status === "success") {
        toast.success("Form submitted successfully!");
        // Reset form and file state
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          phone: "",
          shippingAddress: "",
          artekOrderNumber: "",
          productSku: "",
          serialNumber: "",
          manufacturer: "",
          installationDate: "",
          failureDate: "",
          firmwareUpdated: "",
          firmwareVersion: "",
          failureDescription: "",
          acknowledgeShippingCosts: false,
        });
        setSelectedFile(null);
      } else {
        throw new Error(responseData.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h1>Victron RMA Submission Summary</h1>
        <h2>RMA Filing Instructions</h2>
        <h4 className="rma-instructions">
          Please fill out the form below and click the "submit" button once
          completed.
          <br />
          <br />
          Please save this paperwork as a PDF and attach it to the main RMA form
          before hitting "submit." If you choose to print the additional
          paperwork, you must still attach the completed document as a scanned
          PDF to the main RMA form before hitting "submit."
          <br />
          <br />
          RMAs submitted without the pre-test requirements will be rejected by
          Victron. <br />
          <br />
          Questions? Contact Sales at{" "}
          <a href="mailto:sales@artek.energy">sales@artek.energy</a>
          <br />
          <br />
        </h4>
        <h2>General information</h2>
        <p className="rma-number">
          <strong>RMA Number:</strong> {rmaNumber}
        </p>
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
          required
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
          required
        />
        <TextInput
          label="Shipping Address (please provide desired shipping address for potential replacement item):"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Artek Order #:"
          name="artekOrderNumber"
          value={formData.artekOrderNumber}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Product SKU:"
          name="productSku"
          value={formData.productSku}
          onChange={handleInputChange}
          required
        />
        <RadioButton
          label="Is this a Victron Energy product?"
          name="isVictronProduct"
          value={isVictronProduct}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={(e) => setIsVictronProduct(e.target.value)}
          required
        />
        {isVictronProduct === "yes" && (
          <TextInput
            label='Serial Number (Begins in "HQ"):'
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            required
          />
        )}
        {isVictronProduct === "no" && (
          <>
            <TextInput
              label="Serial Number (if applicable):"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
            />
            <TextInput
              label="Manufacturer:"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <TextInput
          label="Installation Date:"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Failure Date:"
          name="failureDate"
          type="date"
          value={formData.failureDate}
          onChange={handleInputChange}
          required
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
          required
        />
        {formData.firmwareUpdated === "yes" && (
          <TextInput
            label="Firmware Version:"
            name="firmwareVersion"
            value={formData.firmwareVersion}
            onChange={handleInputChange}
            required
          />
        )}
        <TextArea
          label="Brief Description of Failure:"
          name="failureDescription"
          value={formData.failureDescription}
          onChange={handleInputChange}
          required
        />
        <CheckboxInput
          label="I acknowledge that Artek does not cover shipping costs for replacement products or shipping to and from repair centers."
          name="acknowledgeShippingCosts"
          checked={formData.acknowledgeShippingCosts}
          onChange={handleInputChange}
          required
        />
        <h2>Pre-RMA Bench Test Instructions</h2>
        <p>
          To file an RMA for any of the product categories listed below, please perform a Pre-RMA test. You will need to follow the specific instructions provided by Victron Energy for your product.
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


        <p>
        By clicking "Submit," you acknowledge that you have completed the Pre-RMA test if it was necessary for the product.
        </p>
                <br />
        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

export default RmaForm;
