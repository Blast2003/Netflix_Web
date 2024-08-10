import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Signup = async (req, res) =>{
    try {
        const {email, username, password} = req.body;
        if(!email || !username || !password){
            res.status(400).json({
                success : false,
                msg: "All fields are required" // validation = xac thuc
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailRegex.test(email)){
            res.status(400).json({
                success : false,
                msg: "Invalid email" // validation
            })
        }

        const existingEmail = await User.findOne({email: email})

        if(existingEmail){
            return res.status(400).json({
                success : false,
                msg: "Email already exists" // validation
            })
        }

        const existingName = await User.findOne({username: username})
        if(existingName){
            return res.status(400).json({
                success : false,
                msg: "Username already exists" // validation
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];


        const newUser = new User({
            email,
            password: hash,
            username,
            image
        })

       
        generateTokenAndSetCookie({
            id: newUser._id,
            email: newUser.email
        }, res)


        await newUser.save();
        
        // remove password from res
        res.status(201).json({
        success : true,
        msg: "User created successfully",
        user : {
            ...newUser._doc,
            password: "",
        },
        })

    } catch (error) {
        console.log("Error in SignUp",error.message);
        return res.status(500).json({
            success : false,
            msg: error.message
        })
    }
}

export async function login(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ success: false, msg: "All fields are required" });
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, msg: "Invalid credentials (email)" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, msg: "Invalid credentials (password)" });
		}

		generateTokenAndSetCookie({
            id: user._id,
            email: user.email
        }, res)

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, msg: "Internal server error" });
	}
}

export const Logout = async (req, res) =>{
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success : true,
            msg: "User logged out successfully"
        })
    } catch (error) {
        console.log("Error in Logout",error.message);
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}

export const authCheck = async (req, res) =>{
    try {
        console.log("req.user:", req.user);
        res.status(200).json({
            success: true,
            user: req.user
        })
        
    } catch (error) {
        console.log("Error in authCheck",error.message);
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}



