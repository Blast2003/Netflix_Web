import express from 'express';
import { getMovieTrailer, getTrendingMovie, getMovieDetail, getMovieSimilar, getMovieByCategory } from '../controllers/movie_controller.js';

const movie_router = express.Router();

movie_router.get("/trending", getTrendingMovie)
movie_router.get("/:id/trailers", getMovieTrailer)
movie_router.get("/:id/detail", getMovieDetail)
movie_router.get("/:id/similar", getMovieSimilar)
movie_router.get("/:category", getMovieByCategory)

export default movie_router;