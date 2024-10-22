import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String,},
    email: { type: String,},
    attendanceMarks: { type: Number, default: 0 },
    projectReviewMarks: { type: Number, default: 0 },
    assessmentMarks: { type: Number, default: 0 },
    projectSubmissionMarks: { type: Number, default: 0 },
    linkedInPostMarks: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 }
})

export const Student = mongoose.model('Student',studentSchema);