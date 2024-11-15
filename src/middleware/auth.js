import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; 

const userAuth = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token1) {
            throw new Error("Not a valid user");
        }

        // Verify the JWT token 
        const decodedValue = jwt.verify(req.cookies.token1, "Subhash#00$12@");
        const { userId } = decodedValue;

        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        // Send an error response with proper HTTP status
        res.status(401).send({ error: err.message });
    }
}

export { userAuth };
