import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const gmailUser = process.env.Gmail || process.env.SMTP_USER;
  const gmailPass = process.env.Password || process.env.SMTP_PASS;

  if (!gmailUser || !gmailPass) {
    throw new Error(
      "Missing SMTP credentials. Please set 'Gmail' and 'Password' (16-character Google App Password) in your Render environment variables."
    );
  }

  // Remove spaces if password was copied directly from Google App Password UI (e.g., 'abcd efgh ijkl mnop' -> 'abcdefghijklmnop')
  const cleanPass = gmailPass.replace(/\s+/g, "");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee; /* Purple text */
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name}, your One-Time Password (OTP) for account verification is:</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>
`;

  // Multiple SMTP configurations for maximum cloud compatibility (Render / Heroku / AWS)
  const configurations = [];

  if (process.env.SMTP_SERVICE) {
    configurations.push({
      service: process.env.SMTP_SERVICE,
      auth: { user: gmailUser, pass: cleanPass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });
  }

  // Strategy 1: Direct Gmail Service (Recommended for Gmail on cloud hosts)
  configurations.push({
    service: "gmail",
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  // Strategy 2: Standard SMTP Port 587 (STARTTLS)
  configurations.push({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: { rejectUnauthorized: false },
  });

  // Strategy 3: Standard SMTP Port 465 (SSL)
  configurations.push({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: { rejectUnauthorized: false },
  });

  let lastError = null;

  for (const config of configurations) {
    try {
      const transporter = createTransport(config);
      await transporter.sendMail({
        from: `LearnSphere <${gmailUser}>`,
        to: email,
        subject,
        html,
      });
      console.log(`[SMTP Success] OTP email delivered to ${email}`);
      return;
    } catch (err) {
      console.warn(`[SMTP Warning] Connection attempt failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to send OTP email after trying standard SMTP transport options.");
};

export default sendMail;

