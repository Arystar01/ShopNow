import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedpassword,
       // Default value for new users
    });
    const token = jwt.sign({ id: user._id  , isAdmin:user.isAdmin}, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in registerUser",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user._id  , isAdmin:user.isAdmin}, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in loginUser",
    });
  }
};

// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
// const adminLogin= async(req, res)=>{
//   try {
//     //  catching token from request header
//     const {token} = req.body;
//     console.log(token);
//     if(!token){
//       return res.json({success:false,message:"Token not found"})
//     }
//     // verifying token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     if(decoded.isAdmin){
//       return res.json({success:true, message:"Admin Login Successful", isAdmin:decoded.isAdmin});
//     }
//     else{
//       return res.json({success:false,message:"Unauthorized Access"})
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error in adminLogin" });
    
//   }
// }
const addAdmin= async (req, res) =>{
  try {
    const {email, name}=req.body;
    const existingUser = await userModel.findOne({ email });
    if(!existingUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const user = await userModel.findByIdAndUpdate(existingUser._id,{isAdmin:true});
    if(!user) {
      return res.json({
        success: false,
        message: "Error in updating user to admin",
      }); 
    }
    return res.json({
      success: true,
      message: "User updated to admin successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in addAdmin" });
  }
};

 const adminLogin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token not provided or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    if (decoded.isAdmin) {
      return res.json({
        success: true,
        message: "Admin Login Successful",
        isAdmin: true,
        userId: decoded.id,
      });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized Access" });
    }

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

 const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password"); // omit password

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export { loginUser, registerUser, adminLogin , addAdmin, getProfile};