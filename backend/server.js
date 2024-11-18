const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Pool } = require("pg")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors({ origin: "https://forms.artek.energy" })) // Replace with your domain
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// PostgreSQL Connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS if SSL is enabled
  },
})

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.stack)
  } else {
    console.log("Connected to PostgreSQL database!")
    release()
  }
})

// Endpoint to handle form submission
app.post("/submit-form", async (req, res) => {
  const formData = req.body

  try {
    // Insert form data into the PostgreSQL database
    const query = `
      INSERT INTO form_submissions 
      (first_name, last_name, company, email, phone, shipping_address, serial_number, installation_date, failure_date, firmware_updated, firmware_version, failure_description, acknowledge_shipping_costs)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `

    const values = [
      formData.firstName,
      formData.lastName,
      formData.company,
      formData.email,
      formData.phone,
      formData.shippingAddress,
      formData.serialNumber,
      formData.installationDate,
      formData.failureDate,
      formData.firmwareUpdated,
      formData.firmwareVersion,
      formData.failureDescription,
      formData.acknowledgeShippingCosts,
    ]

    const result = await pool.query(query, values)

    // Respond with the inserted data
    res.json({
      status: "success",
      message: "Form submitted successfully!",
      data: result.rows[0], // Return the inserted row for reference
    })
  } catch (error) {
    console.error("Error saving form data:", error.stack)
    res.status(500).json({
      status: "error",
      message: "An error occurred while submitting the form.",
    })
  }
})

// Start the server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
