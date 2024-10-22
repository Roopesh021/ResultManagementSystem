import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// Register Function
export const register = async (req, res) => {
  try {
    const { fullname, email, password} = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    };
    // const file = req.file;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      // profile:{
      //   profilePhoto:cloudResponse.secure_url,
      // }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    if (!email || !password ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // if (role !== user.role) {
    //   return res.status(400).json({
    //     message: "Account doesn't exist with the current role",
    //     success: false,
    //   });
    // }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id:user._id,
      fullname:user.fullname,
      email:user.email,
      // profile:user.profile
    }
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// Logout Function
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// Update Profile Function
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;
//     // // Cloudinary 
//     const fileUri = getDataUri(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//     let skillsArray;
//    if(skills){
//      skillsArray = skills.split(",");
//    }

    
//     const userId = req.id; // Assuming you have middleware to extract userId from the token

//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

    // Updating user data
    // if(fullname) user.fullname = fullname;
    // if(email) user.email = email;
    // if(phoneNumber) user.phoneNumber = phoneNumber;
    // if(bio)  user.profile.bio = bio;
    // if(skills) user.profile.skills = skillsArray;

    // if(cloudResponse){
    // user.profile.resume = cloudResponse.secure_url // Save the cloudinry url
    // user.profile.resumeOriginalName = file.originalname // Save the original name
    // }

    // Save updated user data
  //   await user.save();

  //   user = {
  //     _id:user._id,
  //     fullname:user.fullname,
  //     email:user.email,
  //     phoneNumber:user.phoneNumber,
  //     role:user.role,
  //     profile:user.profile
  //   }

  //   return res.status(200).json({
  //     message: "Profile updated successfully.",
  //     user,
  //     success: true,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
//};