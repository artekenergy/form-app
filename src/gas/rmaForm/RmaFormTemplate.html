/**
 * Main entry point for POST requests (from your React form).
 */
function doPost(e) {
  // 1) Preflight check: if no post data, assume OPTIONS or empty request
  if (!e.postData || !e.postData.contents) {
    return ContentService
      .createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT);
  }

  try {
    const action = e.parameter.action;
    if (!action) throw new Error("No action specified.");

    if (action === "submitAndUpload") {
      // Extract user info from the form for naming
      const firstName = e.parameter.firstName || "Unknown";
      const lastName  = e.parameter.lastName || "Unknown";
      // Format today's date as YYYY-MM-DD
      const todayStr  = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");

      // Create a new subfolder named e.g. "RMA-John-Doe-2025-02-18"
      const mainFolderId = "1jH_lz5typUyesZI6Ue-t30TSwQsY8EMC"; // Replace with your actual folder ID
      const mainFolder   = DriveApp.getFolderById(mainFolderId);
      const rmaNumber  = e.parameter.rmaNumber || "NO-RMA-NUMBER";
      const subFolderName = `${rmaNumber}-${firstName}-${lastName}-${todayStr}`;
      const subFolder     = mainFolder.createFolder(subFolderName);

      // 1) Store the form data in the sheet
      appendFormData(e);

      // 2) Generate a PDF summary of the form
      const pdfBlob = createRmaPdf(e.parameter);

      // 3) Save that PDF summary in the same subfolder
      //    "uploadFileToDrive" returns the file URL
      const pdfFileUrl = uploadFileToDrive(
        pdfBlob,
        "PDF-Summary",
        "RMA_Form_Summary.pdf",
        "RMA PDF Summary",
        subFolder
      );

      // 4) Decode & save the user's uploaded file in the same subfolder
      //    This returns the userFileUrl
      const userFileUrl = storeBase64File(e, subFolder);

      // 5) Send emails (to user + owners) with the PDF attached, plus link to user file
      const userEmail = e.parameter.email; // user’s email from the form
      sendAllEmails(userEmail, pdfBlob, e.parameter, userFileUrl);

      // Return a JSON response
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Form submission & file upload successful",
        pdfFileUrl: pdfFileUrl,
        userFileUrl: userFileUrl
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      throw new Error(`Invalid action: ${action}`);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * For testing or health checks (optional).
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      message: "GET request received"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 1) Stores the form data in the "RMAForm" sheet.
 */
function appendFormData(e) {
  Logger.log("=== Appending form data to the sheet ===");
  const params = e.parameter;

  const spreadsheetId = "1BJQ4TKxyrp4Ygn0beGJFz3UIfYfXjUhcrCg_CsLEH1Y"; // replace
  const spreadsheet   = SpreadsheetApp.openById(spreadsheetId);
  const sheet         = spreadsheet.getSheetByName("RMAForm");
  if (!sheet) throw new Error("RMAForm sheet not found");

  sheet.appendRow([
    params.rmaNumber || '',
    params.firstName || '',
    params.lastName || '',
    params.company || '',
    params.email || '',
    params.phone || '',
    params.shippingAddress || '',
    params.artekOrderNumber || '',
    params.productSku || '',
    params.isVictronProduct || '',
    params.serialNumber || '',
    params.manufacturer || '',
    params.installationDate || '',
    params.failureDate || '',
    params.firmwareUpdated || '',
    params.firmwareVersion || '',
    params.failureDescription || '',
    params.acknowledgeShippingCosts || false
  ]);
}

/**
 * 2) Generates an HTML-based PDF summarizing the form submission.
 */
function createRmaPdf(data) {
  const htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Victron RMA Submission Summary</title>
      </head>
      <body>
        <h1>Victron RMA Submission Summary</h1>
        <p><strong>RMA Number:</strong> ${data.rmaNumber || ""}</p>
        <p><strong>First Name:</strong> ${data.firstName || ""}</p>
        <p><strong>Last Name:</strong> ${data.lastName || ""}</p>
        <p><strong>Company:</strong> ${data.company || ""}</p>
        <p><strong>Email:</strong> ${data.email || ""}</p>
        <p><strong>Phone:</strong> ${data.phone || ""}</p>
        <p><strong>Shipping Address:</strong> ${data.shippingAddress || ""}</p>
        <p><strong>Artek Order #:</strong> ${data.artekOrderNumber || ""}</p>
        <p><strong>Product SKU:</strong> ${data.productSku || ""}</p>
        <p><strong>Victron Energy Product:</strong> ${data.isVictronProduct || ""}</p>
        <p><strong>Serial Number:</strong> ${data.serialNumber || ""}</p>
        <p><strong>Manufacturer:</strong> ${data.manufacturer || ""}</p>
        <p><strong>Installation Date:</strong> ${data.installationDate || ""}</p>
        <p><strong>Failure Date:</strong> ${data.failureDate || ""}</p>
        <p><strong>Firmware Updated?:</strong> ${data.firmwareUpdated || ""}</p>
        <p><strong>Firmware Version:</strong> ${data.firmwareVersion || ""}</p>
        <p><strong>Failure Description:</strong> ${data.failureDescription || ""}</p>
        <p><strong>Acknowledge Shipping Costs?:</strong> ${data.acknowledgeShippingCosts || false}</p>
        <hr>
        <p><em>This PDF is an auto-generated summary of your RMA form submission.</em></p>
      </body>
    </html>
  `;

  const htmlBlob = HtmlService
    .createHtmlOutput(htmlContent)
    .getBlob()
    .setName("RMA_Form_Summary.html");

  // Convert that HTML into a PDF blob
  const pdfBlob = htmlBlob
    .getAs("application/pdf")
    .setName("RMA_Form_Summary.pdf");

  return pdfBlob;
}

/**
 * 3) Decodes the Base64 file from e.parameter and stores it in the given `subFolder`.
 * Returns the file's Drive URL.
 */
function storeBase64File(e, subFolder) {
  Logger.log("=== Storing Base64 file in the same folder ===");
  const fileName   = e.parameter.fileName;
  const fileType   = e.parameter.fileType;
  const base64Data = e.parameter.fileData;

  if (!base64Data) {
    Logger.log("No fileData found, skipping file upload.");
    return null;
  }

  // Decode the base64
  const decodedBytes = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedBytes, fileType, fileName);

  // Actually create the file in that subFolder
  const fileUrl = uploadFileToDrive(
    blob,
    "Uploaded",
    "File",
    "UploadedFile",
    subFolder
  );

  Logger.log("User file uploaded to: " + fileUrl);
  return fileUrl;
}

/**
 * 3a) Actually writes a blob to the given folder in Drive, returns the file URL.
 */
function uploadFileToDrive(blob, folderName, fileName, fileDescription, parentFolder) {
  try {
    const file = parentFolder.createFile(blob);
    file.setName(fileName);
    file.setDescription(fileDescription);
    return file.getUrl();
  } catch (error) {
    Logger.log("Error in uploadFileToDrive: " + error.message);
    throw error;
  }
}

/**
 * 4) Emails:
 *   - The user (attached PDF summary)
 *   - The owners (attached PDF summary + link to the user file)
 */
function sendAllEmails(userEmail, pdfBlob, data, fileUrl) {
  // 1) If user provided an email, send them the PDF summary
  if (userEmail) {
    const subjectUser = "Your RMA Form Submission - PDF Summary";
    const messageUser = `Dear ${data.firstName || "User"},\n\nThank you for submitting your RMA form. Attached is a PDF summary of your submission.\n\nBest regards,\nArtek`;

    MailApp.sendEmail({
      to: userEmail,
      subject: subjectUser,
      body: messageUser,
      attachments: [pdfBlob],
    });
    Logger.log(`Sent RMA PDF to user: ${userEmail}`);
  }

  // 2) Owners get the PDF + link to the user's uploaded file
  const ownerEmails  = "sales@artek.energy";
  const subjectOwner = "New RMA Submission - PDF & File Upload";
  const messageOwner = `A new RMA submission has been received. Attached is the PDF summary.\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\n\nUploaded File: ${fileUrl}\n\nBest regards,\nArtek`;

  MailApp.sendEmail({
    to: ownerEmails,
    subject: subjectOwner,
    body: messageOwner,
    attachments: [pdfBlob],
  });
  Logger.log(`Sent RMA PDF + file URL to owners: ${ownerEmails}`);
}

/**
 * Generates a simple unique ID (timestamp) if we need it.
 */
function generateUniqueIdentifier() {
  return new Date().getTime().toString();
}

