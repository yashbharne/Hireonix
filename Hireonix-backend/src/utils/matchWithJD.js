// src/utils/matchWithJD.js
const axios = require("axios");
module.exports = async function matchResumeWithJD(resume, jd) {
  // Extract keywords from job description (could improve with NLP)
  const response = await axios.post("http://localhost:9000/score", {
    jd,
    resume,
  });


  return response.data.ats_score;
};
