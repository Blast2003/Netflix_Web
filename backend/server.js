// const express = require('express')

import env from "dotenv"
import express from 'express'
import auth_router from "./routes/auth_route.js"
import { connectDB } from "./config/db.js"
import { ENV_VARS } from "./config/envVariables.js"
import movie_router from "./routes/movie_router.js"
import tv_router from "./routes/tv_router.js"
import cookieParser from "cookie-parser"
import { protectRoute } from "./MiddleWare/protectRouter.js"
import search_router from "./routes/search_router.js"
import path from "path"

env.config()
const app = express()
const __dirname = path.resolve(); // address of current folder, in this case: inside NETFLIX folder
const port = ENV_VARS.PORT;


app.use(cookieParser()) 

app.use(express.json()) // allow to parse req.body

app.use("/api/v1/auth", auth_router)
app.use("/api/v1/movie", protectRoute, movie_router)
app.use("/api/v1/tv", protectRoute, tv_router)
app.use("/api/v1/search", protectRoute, search_router)


if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile( path.resolve(__dirname, "frontend", "dist", "index.html") );
    })
}


app.listen(port, () =>{
    connectDB()
    console.log('listening on port: ', port)
})


