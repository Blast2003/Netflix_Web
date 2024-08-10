import mongoose from "mongoose"
import { ENV_VARS } from "./envVariables.js"
export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL)
        console.log(`Connected to: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1) // process code 1 means exit with failure, 0 means success
    }
}