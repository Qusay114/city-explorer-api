require('dotenv').config()
const server = require('express') ;
const cors = require('cors');
const superagent = require('superagent');

const weatherData = require('./data/weather.json');

const app = server();
app.use(cors());
const port = process.env.PORT ;



// app.get('/weather' , (req , res) => {
//     const data = weatherData.data.map( data => new Weather(data));
//     res.send(data);
// });

app.get('/weather' , (req , res) => {
    console.log(req.query);
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(url).then( data1 => { 
    const data = data1.body.data.map( data => new Weather(data));
    res.send(data);

})});

app.get('/movies' , (req , res) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.city}`;
    superagent.get(url).then( data => {
        const moviesData = data.body.results.map( data => new Movies(data));
        res.send(moviesData);
    })
    
})


app.get('/test' , (req, res) => {
    
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=5646&la=546&ln=456`;
        superagent.get(url).then(data => res.send(data)).catch(res.send('error') );
});

class Weather {
    constructor(data){
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

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
}

app.listen(port);






