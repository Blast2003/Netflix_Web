import { fetchFromTMDB } from "../service/tmdb_service.js"


export const getTrendingMovie = async(req, res, type) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];
        
        res.status(200).json({
            success: true,
            content: randomMovie
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}


export const getMovieTrailer = async(req, res) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        
        
        res.status(200).json({
            success: true,
            content: data.results
        })
    } catch (error) {
        console.log(error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}

export const getMovieDetail = async(req, res) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        
        
        res.status(200).json({
            success: true,
            content: data
        })
    } catch (error) {
        console.log(error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}

export const getMovieSimilar = async(req, res) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1S`);
        
        
        res.status(200).json({
            success: true,
            content: data.results
        })
    } catch (error) {
        console.log(error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}


export const getMovieByCategory = async(req, res) => {
    try {
        const {category} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        
        
        res.status(200).json({
            success: true,
            content: data.results
        })
    } catch (error) {
        console.log(error.message);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        return res.status(500).json({
            success : false,
            msg: "Internal Server Error"
        })
    }
}