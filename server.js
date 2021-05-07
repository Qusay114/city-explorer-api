require('dotenv').config()
const server = require('express') ;
const cors = require('cors');
const superagent = require('superagent');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


const app = server();
app.use(cors());
const port = process.env.PORT ;



app.get('/weather' , getWeather );

app.get('/movies' , getMovies );



app.listen(port);






