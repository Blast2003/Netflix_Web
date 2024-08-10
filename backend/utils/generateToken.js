import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVariables.js"

export const generateTokenAndSetCookie = (payload, res) =>{
    const token = jwt.sign({...payload}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});

    res.cookie("jwt-netflix", token, {
        maxAge: 15*24*60*60*1000, // 15d in milliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: ENV_VARS.NODE_ENV !== "development",
    })
}