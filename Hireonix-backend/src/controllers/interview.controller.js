const { interviewService } = require("../services/index");

exports.scheduleInterview = async (req, res) => {
  try {
    const result = await interviewService.scheduleInterviewService(req.body);

    res.status(201).json({
      success: true,
      message: "Interview scheduled",
      interview: result.interview,
      tempLogin: result.tempLogin,
    });
  } catch (err) {
    console.error("Interview scheduling error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
