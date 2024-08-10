import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { ENV_VARS } from "../config/envVariables.js";


export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({
                success: false,
                msg: "Unauthorized - No Token Provided"
            })
        }

        const decode = jwt.verify(token, ENV_VARS.JWT_SECRET) 
        if(!decode){
            return res.status(401).json({
                success: false,
                msg: "Unauthorized - No Token Provided"
            })
        }

        // double check having object id &&  remove password
        const user = await User.findById(decode.id).select("-password")
        if(!user){
            return res.status(404).json({
                success: false,
                msg: "User not found"
            })
        }

        req.user = user // after passing through middleware, the value of user has been saved and used it inside controller Ex: used inside search_router.js

        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ",error.message)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}
