# OTP Verification Website

## Setup Instructions

This document serves as a guide to set up the OTP verification website using the Twilio API.

### Prerequisites
- Node.js installed on your machine.
- A Twilio account (sign up if you don’t have one).
- Basic knowledge of JavaScript and web development.

### Installation Steps
1. **Clone the Repository**  
   `git clone https://github.com/hafizvai001/bbbzxc.git`

2. **Navigate to the project directory**  
   `cd bbbzxc`

3. **Install Dependencies**  
   Use npm to install the required packages:  
   `npm install`

4. **Configure Twilio Credentials**  
   - Sign in to your Twilio account and navigate to the Console.  
   - Create a new project and obtain your `Account SID` and `Auth Token`.  
   - Add these credentials to your environment variables or a configuration file as follows:
     - `TWILIO_ACCOUNT_SID=your_account_sid`
     - `TWILIO_AUTH_TOKEN=your_auth_token`

5. **Start the Application**  
   Run the following command to start the application:  
   `npm start`

6. **Access the Website**  
   Open your web browser and go to `http://localhost:3000` to access the OTP verification website.

### Usage
- Follow the prompts on the website to enter your phone number and receive OTP for verification.

### Troubleshooting
- If you encounter any issues, check the console for error messages and ensure that your Twilio credentials are correct.

### License
This project is licensed under the MIT License.