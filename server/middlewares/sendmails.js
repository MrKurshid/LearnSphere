import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const gmailUser = process.env.Gmail || process.env.SMTP_USER;
  const gmailPass = process.env.Password || process.env.SMTP_PASS;

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

  // 1. Resend HTTP API (HTTPS Port 443 - Recommended for Render cloud hosting)
  if (process.env.RESEND_API_KEY) {
    try {
      console.log("[Email Service] Attempting delivery via Resend HTTP API...");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "LearnSphere <onboarding@resend.dev>",
          to: [email],
          subject: subject,
          html: html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[Resend Success] OTP email delivered to ${email}`, resData);
        return;
      }
      console.warn(`[Resend API Error]:`, resData);
    } catch (apiErr) {
      console.warn(`[Resend API Failed]:`, apiErr.message);
    }
  }

  // 2. Brevo HTTP API (HTTPS Port 443 - Recommended for Render cloud hosting)
  if (process.env.BREVO_API_KEY) {
    try {
      console.log("[Email Service] Attempting delivery via Brevo HTTP API...");
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "LearnSphere",
            email: gmailUser || "noreply@learnsphere.com",
          },
          to: [{ email }],
          subject: subject,
          htmlContent: html,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`[Brevo Success] OTP email delivered to ${email}`, resData);
        return;
      }
      console.warn(`[Brevo API Error]:`, resData);
    } catch (apiErr) {
      console.warn(`[Brevo API Failed]:`, apiErr.message);
    }
  }

  if (!gmailUser || !gmailPass) {
    throw new Error(
      "Missing SMTP/Email credentials. Please set 'RESEND_API_KEY' (Recommended for Render) or 'Gmail' & 'Password' in your Render environment variables."
    );
  }

  // Clean up password whitespace if copied from Google App Password UI
  const cleanPass = gmailPass.replace(/\s+/g, "");

  // 3. Custom/Third-party SMTP Host (e.g. Brevo smtp-relay.brevo.com, SendGrid, Mailgun)
  if (process.env.SMTP_HOST && process.env.SMTP_HOST !== "smtp.gmail.com") {
    try {
      console.log(`[Email Service] Attempting delivery via custom SMTP host ${process.env.SMTP_HOST}...`);
      const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: gmailUser, pass: cleanPass },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000,
      });

      await transporter.sendMail({
        from: `LearnSphere <${gmailUser}>`,
        to: email,
        subject,
        html,
      });
      console.log(`[SMTP Host Success] OTP email delivered to ${email}`);
      return;
    } catch (customErr) {
      console.warn(`[Custom SMTP Warning] ${process.env.SMTP_HOST} connection failed:`, customErr.message);
    }
  }

  // 4. Standard Nodemailer Gmail SMTP Strategies (Port 587 / Port 465 / service: "gmail")
  const configurations = [];

  if (process.env.SMTP_SERVICE) {
    configurations.push({
      service: process.env.SMTP_SERVICE,
      auth: { user: gmailUser, pass: cleanPass },
      connectionTimeout: 6000,
      greetingTimeout: 6000,
      socketTimeout: 6000,
    });
  }

  configurations.push({
    service: "gmail",
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 6000,
  });

  configurations.push({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 6000,
    tls: { rejectUnauthorized: false },
  });

  configurations.push({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: cleanPass },
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 6000,
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

  throw new Error(
    "Render cloud host blocked outbound Gmail SMTP ports (Connection timeout). Please add RESEND_API_KEY or BREVO_API_KEY in Render Environment Variables for HTTPS delivery."
  );
};

export default sendMail;


