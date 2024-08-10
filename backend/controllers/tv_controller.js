import { fetchFromTMDB } from "../service/tmdb_service.js"


export const getTrendingTV = async (req, res, type) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1')
        const randomTV = data.results[ Math.floor( (Math.random()*(data.results?.length)) )]

        //random 1 TV 
        res.status(200).json({
            success: true,
            content: randomTV
        })
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}


export const getMovieTrailerByTV = async(req, res, type) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        
        
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

export const getMovieTVDetail = async(req, res, type) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        
        
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

export const getMovieTVSimilar = async(req, res, type) => {
    try {
        const {id} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1S`);
        
        
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


export const getMovieTVByCategory = async(req, res, type) => {
    try {
        const {category} = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        
        
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