const superagent = require('superagent');
require('dotenv').config();
const cacheMemory = {};


const getMovies = (req , res) => {
    const url = `https://api.themoviedb.org/3/search/movie`;
    const key = req.query.city ;
    const queryParams = {
        api_key:process.env.MOVIE_API_KEY,
        query:req.query.city ,
    }
    
    if(cacheMemory[key])
    {
        res.send(cacheMemory[key]);
        console.log('sent from cache memory');
    }
    else{
    superagent.get(url).query(queryParams).then( data => {
        const moviesData = data.body.results.map( data => new Movies(data));
        cacheMemory[key] = moviesData ;
        res.send(moviesData);
        console.log('sent from  Api request ');
    }).catch( error => res.send(error));
}
    console.log(cacheMemory);
    
} ;


class Movies{
    constructor(data){
        this.title= data.title ;
        this.overview =data.overview;
        this.average_votes =data.vote_average;
        this.total_votes=data.vote_count ;
        if(data.backdrop_path !== null)
            this.image_url =`https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
        else
            this.image_url = 'there is no image';
        this.popularity = data.popularity ;
        this.released_on = data.release_date ;
    }
} ;


module.exports = getMovies ;

