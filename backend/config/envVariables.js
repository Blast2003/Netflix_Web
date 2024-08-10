import env from "dotenv";

env.config();

export const ENV_VARS = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT || 5001,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV ,
    TMDB_API_KEY: process.env.TMDB_API_KEY
}