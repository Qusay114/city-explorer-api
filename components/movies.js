const superagent = require('superagent');
require('dotenv').config();



const getMovies = (req , res) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.city}`;
    superagent.get(url).then( data => {
        const moviesData = data.body.results.map( data => new Movies(data));
        res.send(moviesData);
    })
    
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

