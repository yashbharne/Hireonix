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

