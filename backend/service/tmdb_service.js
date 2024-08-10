
import axios from "axios";
import { ENV_VARS } from "../config/envVariables.js";


// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

export const fetchFromTMDB = async (url) =>{

    // use TMDB_API_KEY inside backend server => make it privacy, can not see from everywhere, but use on frontend => can see
    //frontend => visible for everyone
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`  
        }
    };

    const res = await axios.get(url, options);

    if(res.status !== 200){
        throw new Error("Failed to fetch data from TMDB" + res.statusText)
    }
    
    return res.data
}