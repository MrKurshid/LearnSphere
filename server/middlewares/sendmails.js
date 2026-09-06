import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transportOptions = process.env.SMTP_SERVICE
    ? {
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.Gmail,
          pass: process.env.Password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      }
    : {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: {
          user: process.env.Gmail,
          pass: process.env.Password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        tls: {
          rejectUnauthorized: false,
        },
      };

  let transport = createTransport(transportOptions);

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
        <p>Hello ${data.name} your (One-Time Password) for your account verification is.</p>
        <p class="otp">${data.otp}</p> 
    </div>
</body>
</html>
`;

  try {
    await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    if (
      !process.env.SMTP_HOST &&
      !process.env.SMTP_SERVICE &&
      (error.code === "ETIMEDOUT" ||
        error.message?.toLowerCase().includes("timeout") ||
        error.command === "CONN")
    ) {
      console.warn(
        "SMTP Port 465 connection failed/timed out. Attempting fallback to Port 587 (STARTTLS)..."
      );
      const fallbackTransport = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.Gmail,
          pass: process.env.Password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        tls: {
          rejectUnauthorized: false,
        },
      });

      await fallbackTransport.sendMail({
        from: process.env.Gmail,
        to: email,
        subject,
        html,
      });
      return;
    }
    throw error;
  }
};

export default sendMail;
