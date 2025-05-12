const axios = require("axios");
const pdfParse = require("pdf-parse");

module.exports = async function extractResumeData(resumeUrl) {
  try {
    // Step 1: Download the PDF file as a buffer
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });
    const pdfBuffer = response.data;
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    return text;
  } catch (error) {
    return "Error extracting resume data:", error.message;
  }
};
