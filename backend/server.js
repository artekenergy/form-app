const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ origin: 'https://forms.artek.energy' })); // Replace with your domain
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  // TODO: Process formData (e.g., save to database, send email)
  res.json({ status: 'success', message: 'Form submitted successfully!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
