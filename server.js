// server.js

const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);
const otps = {}; // In-memory store for OTPs

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP

    otps[phoneNumber] = otp;

    client.messages
        .create({
            body: `Your OTP is ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        })
        .then(message => {
            res.json({ success: true, message: 'OTP sent!', sid: message.sid });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Error sending OTP', error: err.message });
        });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (otps[phoneNumber] && otps[phoneNumber] === otp) {
        delete otps[phoneNumber]; // Invalidate used OTP
        res.json({ success: true, message: 'OTP verified successfully!' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
