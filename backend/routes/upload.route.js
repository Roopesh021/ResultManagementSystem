import express from "express";
import { fileUpload , getStudentAssessmentMarks, getStudentAttendance, getStudentLinkedinPostMarks, getStudentProjectReviewMarks, getStudentProjectSubmissionMarks, getStudentResults, userFileUpload} from "../controllers/file.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/upload").post(singleUpload,userFileUpload);

router.route("/upload/:category").post(singleUpload,fileUpload);

router.get('/results/:studentId', getStudentResults);

router.route("/attendance").get(getStudentAttendance);

router.route("/projectReview").get(getStudentProjectReviewMarks);

router.route("/assessment").get(getStudentAssessmentMarks);

router.route("/projectSubmission").get(getStudentProjectSubmissionMarks);

router.route("/linkedinPost").get(getStudentLinkedinPostMarks);
export default router;