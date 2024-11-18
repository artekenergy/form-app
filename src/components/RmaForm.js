/* global gapi */
import React, { useState, useEffect, useCallback } from "react";
import TextInput from "./TextInput";
import RadioButton from "./RadioButton";
import CheckboxInput from "./CheckboxInput";
import TextArea from "./TextArea";
import IFrame from "./IFrame";
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_KEY = "AIzaSyAux_TCLah82CLaEMVb7luoTtiSbx4c3Oo";
const CLIENT_ID = "603351500773-o9smkof98e28rd06ksv3st0grbn8ochp.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let gapiInitialized = false;

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

  const [selectedFile, setSelectedFile] = useState(null);
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

  // Load the GAPI script dynamically
  const loadGapiScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("gapi-script")) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.id = "gapi-script";
      script.src = "https://apis.google.com/js/api.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load gapi script"));
      document.body.appendChild(script);
    });
  }, []);

  // Initialize GAPI client
  const loadGapi = useCallback(async () => {
    try {
      await loadGapiScript();
      gapi.load("client:auth2", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          scope: SCOPES,
        });
        gapiInitialized = true;
        console.log("GAPI Initialized");
      });
    } catch (error) {
      console.error("Error loading GAPI:", error);
      toast.error("Error initializing Google API client.");
    }
  }, [loadGapiScript]);

  // Authenticate and get access token
  const authenticate = useCallback(async () => {
    if (!gapiInitialized) throw new Error("GAPI not initialized");
    const GoogleAuth = gapi.auth2.getAuthInstance();
    if (!GoogleAuth.isSignedIn.get()) {
      await GoogleAuth.signIn();
    }
    return GoogleAuth.currentUser.get().getAuthResponse().access_token;
  }, []);

  // File Upload Handler
  const handleUploadFile = async (e) => {
    e.preventDefault();
    setLoadingUpload(true);
  
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      setLoadingUpload(false);
      return;
    }
  
    try {
      // Ensure GAPI is initialized
      if (!gapiInitialized) {
        await loadGapi();
      }
  
      const accessToken = await authenticate();
      const metadata = {
        name: selectedFile.name,
        mimeType: selectedFile.type,
      };
  
      const formData = new FormData();
      formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
      formData.append("file", selectedFile);
  
      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success(`File uploaded successfully: ${data.name}`);
        setSelectedFile(null);
      } else {
        toast.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setLoadingUpload(false);
    }
  };
  

  // Load GAPI on component mount
  useEffect(() => {
    loadGapi();
  }, [loadGapi]);

  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.");
      setLoadingForm(false);
      return;
    }

    try {
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataPayload.append(key, formData[key]);
      });

      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwhcHILKH1Oky3UrtaSZyKrUIteqlHI1nnbpOSnyX310EbNKIuR5zax_it7in0mTAym/exec";

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        body: formDataPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success") {
          toast.success("Form submitted successfully!");
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
          toast.error(`Form submission failed: ${responseData.message || "Unknown error."}`);
        }
      } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoadingForm(false);
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