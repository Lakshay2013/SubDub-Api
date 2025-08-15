import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No token found
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // NOTE: Your token uses 'userID', not 'userId'
        const user = await User.findById(decoded.userID);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized - Invalid token",
            error: error.message
        });
    }
};

export default authorize;
