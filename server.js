const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(express.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password', // Your email password
    },
});

// Store OTPs and their expiry times
let otps = {};
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes expiry

// Rate limit to control OTP requests
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
});

// Generate and send OTP
app.post('/generate-otp', limiter, async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
    const expiryTime = Date.now() + OTP_EXPIRY_TIME;

    otps[email] = { otp, expiryTime };

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp} and it is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send('OTP sent to your email.');
    } catch (error) {
        return res.status(500).send('Error sending OTP.');
    }
});

// Validate OTP
app.post('/validate-otp', (req, res) => {
    const { email, otp } = req.body;

    const storedData = otps[email];
    if (!storedData) return res.status(400).send('OTP not generated or expired.');

    const { otp: storedOtp, expiryTime } = storedData;

    if (Date.now() > expiryTime) {
        delete otps[email];
        return res.status(400).send('OTP expired.');
    }

    if (storedOtp !== otp) {
        return res.status(400).send('Invalid OTP.');
    }

    delete otps[email]; // Remove OTP after successful validation
    res.send('OTP validated successfully.');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
