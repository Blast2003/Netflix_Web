import express from 'express';
import { getTrendingTV, getMovieTrailerByTV, getMovieTVDetail, getMovieTVSimilar, getMovieTVByCategory } from '../controllers/tv_controller.js';

const tv_router = express.Router();

tv_router.get("/trending", getTrendingTV)
tv_router.get("/:id/trailers", getMovieTrailerByTV)
tv_router.get("/:id/detail", getMovieTVDetail)
tv_router.get("/:id/similar", getMovieTVSimilar)
tv_router.get("/:category", getMovieTVByCategory)


export default tv_router