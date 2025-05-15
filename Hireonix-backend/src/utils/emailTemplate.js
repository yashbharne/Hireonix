exports.applicationStatusTemplate = (name, jobTitle, status) => `
  <div style="font-family:sans-serif; padding:10px;">
    <h2>Hi ${name},</h2>
    <p>Your application for <strong>${jobTitle}</strong> has been <strong>${status}</strong>.</p>
    <p>Thank you for your interest.</p>
  </div>
`;

exports.resumeReceivedTemplate = (name, jobTitle) => `
  <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
    <h2 style="color: #2c3e50;">Hi ${name},</h2>
    <p>Thank you for applying for the position of <strong>${jobTitle}</strong>.</p>
    <p>We have successfully received your resume and our recruitment team will review it shortly.</p>
    <p>If your profile matches our requirements, we will get in touch with you for the next steps.</p>
    <br/>
    <p style="margin: 0;">Best regards,</p>
    <p style="margin: 0;">Recruitment Team</p>
    <p style="margin: 0;">SRS-IMS</p>
  </div>
`;

exports.interviewScheduleTemplate = (
  name,
  jobTitle,
  dateTime,
  mode,
  link = ""
) => `
  <div style="font-family:sans-serif; padding:10px;">
    <h2>Hi ${name},</h2>
    <p>You have been shortlisted for the role of <strong>${jobTitle}</strong>.</p>
    <p><strong>Interview Details:</strong></p>
    <ul>
      <li><strong>Date & Time:</strong> ${dateTime}</li>
      <li><strong>Mode:</strong> ${mode}</li>
      ${
        mode.toLowerCase() === "online"
          ? `<li><strong>Link:</strong> <a href="${link}">${link}</a></li>`
          : ""
      }
    </ul>
    <p>All the best!</p>
  </div>
`;

exports.sendOtpTemplate = (otp, expiryTimeInMinutes) => `
  <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
    <h2 style="color: #2c3e50;">Hi </h2>
    <p>Your one-time password (OTP) for verification is:</p>
    <h1 style="color: #e74c3c; font-size: 32px; margin: 16px 0;">${otp}</h1>
    <p>This OTP is valid for the next <strong>${expiryTimeInMinutes} minutes</strong>.</p>
    <p style="color: #555;">Please do not share this code with anyone.</p>
    <br/>
    <p>If you did not request this code, you can safely ignore this email.</p>
    <br/>
    <p style="margin: 0;">Best regards,</p>
    <p style="margin: 0;">Security Team</p>
    <p style="margin: 0;">SRS-IMS</p>
  </div>
`;

exports.sendInterviewerCredentialsMail = (
  username,
  tempPassword
) => `<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2>Hello</h2>
        <p>You have been added as an interviewer to our Interview Management System.</p>

        <h4>Your login credentials:</h4>
        <ul>
          <li><strong>Username:</strong> ${username}</li>
          <li><strong>Temporary Password:</strong> ${tempPassword}</li>
        </ul>

        <p><strong>Important:</strong> Please log in using the above credentials, change your password, and complete your profile to start conducting interviews.</p>

        <p>
          <a href="http://localhost:5000/auth/login" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
        </p>

        <p>If you have any questions or issues accessing your account, feel free to reach out to our support team.</p>

        <p>Thanks,<br/>Interview Management System Team</p>
      </div>
    `;
