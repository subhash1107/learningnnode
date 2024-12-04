import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; 

const userAuth = async (req, res, next) => {
    try {
        // if (!req.cookies || !req.cookies.token1) {
        //      return res.status(401).send("Please Login")
        // }
        
        const authHeader = await req.headers.authorization;
        if(authHeader){
        console.log("authheader found");
        }
        // if (!authHeader) {
        //     return res.status(401).send("Please Login");
        //     }
      
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).send("Please Login")
          }
        // Verify the JWT token 
        const decodedValue = jwt.verify(token, "Subhash#00$12@");
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
