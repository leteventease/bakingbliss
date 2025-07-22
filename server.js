// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create an instance of an Express app
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/register', (req, res) => {
    // Extract form data from request body
    const { name, number, email, thoughts } = req.body;
    
    // Create formatted data string
    const registrationData = `Name: ${name}\nNumber: ${number}\nEmail: ${email}\nReason: ${thoughts}\n\n`;

    // Ensure "data" folder exists and save data to a text file
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }
    fs.appendFileSync(path.join('data', 'registrations.txt'), registrationData);

    // Send a response to confirm successful registration
    res.send(`
        <h2>Registration Completed</h2>
        <p>Your registration is successful. <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK">Click here to join the WhatsApp group</a>.</p>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
