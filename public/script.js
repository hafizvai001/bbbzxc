// Function to send OTP via API
async function sendOTP(phoneNumber) {
    try {
        const response = await fetch('https://your-otp-api-endpoint.com/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phoneNumber })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
}

// Function to verify OTP
async function verifyOTP(otp) {
    try {
        const response = await fetch('https://your-otp-api-endpoint.com/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
}

// Form submission handler
document.getElementById('otpForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;

    try {
        await sendOTP(phoneNumber);
        // Handle OTP sent feedback
        console.log('OTP sent. Please check your phone.');
    } catch (error) {
        console.error('Failed to send OTP.');
    }
});

// Function to handle real-time feedback
function showFeedback(message) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = message;
    feedbackElement.style.display = 'block';
}

// Example call to verify OTP
// verifyOTP(userInputOtp); // Call this function after user enters OTP