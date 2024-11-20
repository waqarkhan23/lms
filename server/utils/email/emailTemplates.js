export const sendVerificationCodeTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .content {
        padding: 30px;
        text-align: center;
        font-size: 16px;
      }
      .verification-code {
        font-size: 24px;
        font-weight: bold;
        color: #4caf50;
        margin: 20px 0;
      }
      .footer {
        font-size: 14px;
        color: #888888;
        padding: 20px;
        text-align: center;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Verify Your Account</h1>
      </div>
      <div class="content">
        <p>Hi,</p>
        <p>
          Thank you for signing up! Please use the following code to verify your
          email address.
        </p>
        <div class="verification-code">[CODE]</div>
        <p>
          If you didn't request this email, please ignore it or contact our
          support team.
        </p>
      </div>
      <div class="footer">
        <p>
          Need help? Visit our <a href="#">Help Center</a> or contact us at
          <a href="mailto:support@example.com">support@example.com</a>.
        </p>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;

export const welcomeEmailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to [Your Company]</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
        text-align: center;
      }
      .content h2 {
        font-size: 22px;
        color: #333;
        margin-bottom: 20px;
      }
      .content p {
        font-size: 16px;
        color: #555;
        line-height: 1.5;
      }
      .cta-button {
        margin-top: 30px;
        display: inline-block;
        background-color: #4caf50;
        color: white;
        padding: 15px 25px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .cta-button:hover {
        background-color: #43a047;
      }
      .footer {
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Welcome to LMS</h1>
      </div>
      <div class="content">
        <h2>Congratulations, [User's Name]!</h2>
        <p>
          Your account has been successfully verified. We're excited to have you on board!
        </p>
        <p>
          Get started by exploring your dashboard and discovering all the features we offer to make your experience amazing.
        </p>
        <a href="[Dashboard URL]" class="cta-button">Go to Your Dashboard</a>
      </div>
      <div class="footer">
        <p>Need help? Visit our <a href="#">Help Center</a> or contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <p>&copy; 2024 LMS. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;

export const passwordResetTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #3498db;
        color: white;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 30px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #555;
        line-height: 1.5;
      }
      .reset-button {
        margin-top: 30px;
        display: inline-block;
        background-color: #3498db;
        color: white;
        padding: 15px 25px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .reset-button:hover {
        background-color: #2980b9;
      }
      .footer {
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
      .footer a {
        color: #3498db;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>
          We received a request to reset your password. If you didn't make this request, you can ignore this email.
        </p>
        <p>
          To reset your password, click the button below. This link will expire in 1 hour for security reasons.
        </p>
        <a href="[RESET_LINK]" class="reset-button">Reset Your Password</a>
        <p>
          If the button above doesn't work, you can copy and paste the following link into your browser:
        </p>
        <p>[RESET_LINK]</p>
        <p>
          For security reasons, this link will expire in 1 hour. If you need to reset your password after that, please request a new reset link.
        </p>
      </div>
      <div class="footer">
        <p>Need help? Visit our <a href="#">Help Center</a> or contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <p>&copy; 2024 MERN AUTH. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;
