import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }

    req.user = decoded; // { id, isAdmin }
    next();

  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
