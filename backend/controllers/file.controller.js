import XLSX from "xlsx";
import fs from "fs";

import { Student } from "../models/student.model.js";

export const fileUpload = async (req,res) =>{
    const {category} = req.params;
    try {
        const file = req.file;
        console.log(file);
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
    
        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        for (let row of jsonData) {
            let result = await Student.findOne({ studentId: row.studentId });
            if (!result) {
              result = new Student({ studentId: row.studentId });
            }
            result.name = row.name;
            result.email = row.email;
            result[`${category}Marks`] = row[`${category}Marks`];
            result.totalMarks = calculateTotalMarks(result);
            await result.save();
          }
        return res.status(201).json({
            message: "Marks uploaded successfully!",
            success: true,
          });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error uploading marks.",
            success: false,
          });
    }
}

// Function to retrieve student results
export const getStudentResults = async (req, res) => {
    try {
      const { studentId } = req.params;
      const result = await Student.findOne({ studentId });
  
      if (!result) {
        return res.status(404).json({ message: 'Result not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving results' });
    }
  };

  // Function to retrieve student attendance
  export const getStudentAttendance = async (req,res) =>{
    try {
      const attendanceRecords = await Student.find({}, {  studentId: 1, name: 1, email:1, attendanceMarks: 1 });
      return (
        res.status(200).json({
          attendanceRecords,
          success: true
      })
      )
      
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance records', error });
      
    }
  }

    // Function to retrieve student ProjectReviewMarks
    export const getStudentProjectReviewMarks = async (req,res) =>{
      console.log("hello1");
      try {
        const projectReviewRecords = await Student.find({}, {  studentId: 1, name: 1, email:1, projectReviewMarks: 1 });
        return (
          res.status(200).json({
            projectReviewRecords,
            success: true
        })
        )
        
      } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error });
        
      }
    }

    // Function to retrieve student assessmentMarks
    export const getStudentAssessmentMarks = async (req,res) =>{
      try {
        const assessmentMarksRecords = await Student.find({}, {  studentId: 1, name: 1, email:1, assessmentMarks: 1 });
        return (
          res.status(200).json({
            assessmentMarksRecords,
            success: true
        })
        )
        
      } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance records', error });
        
      }
    }

        // Function to retrieve student Project Submisssion
        export const getStudentProjectSubmissionMarks = async (req,res) =>{
          try {
            const projectSubmissionMarksRecords = await Student.find({}, {  studentId: 1, name: 1, email:1, projectSubmissionMarks: 1 });
            return (
              res.status(200).json({
                projectSubmissionMarksRecords,
                success: true
            })
            )
            
          } catch (error) {
            res.status(500).json({ message: 'Error fetching attendance records', error });
            
          }
        }

        // Function to retrieve student Project Submisssion
        export const getStudentLinkedinPostMarks = async (req,res) =>{
          try {
            const linkedinPostRecords = await Student.find({}, {  studentId: 1, name: 1, email:1, linkedInPostMarks: 1 });
            return (
              res.status(200).json({
                linkedinPostRecords,
                success: true
            })
            )
            
          } catch (error) {
            res.status(500).json({ message: 'Error fetching attendance records', error });
            
          }
        }




// Function to calculate total marks
const calculateTotalMarks = (result) => {
    return (
      result.attendanceMarks +
      result.projectReviewMarks +
      result.assessmentMarks +
      result.projectSubmissionMarks +
      result.linkedInPostMarks
    );
  };