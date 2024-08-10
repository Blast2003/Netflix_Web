import express from 'express';
import { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory } from '../controllers/search_controller.js';

const search_router = express.Router();

search_router.get("/person/:query", searchPerson)
search_router.get("/movie/:query", searchMovie)
search_router.get("/tv/:query", searchTv)

search_router.get("/history", getSearchHistory)

search_router.delete("/deleteHistory/:id", removeItemFromSearchHistory)


export default search_router