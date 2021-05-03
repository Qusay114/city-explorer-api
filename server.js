require('dotenv').config()
const server = require('express') ;
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = server();
app.use(cors());
const port = process.env.PORT ;
app.get('/' , (req , res) => res.send(`creating my local server port`));

app.get('/weather' , (req , res) => res.send(weatherData.cityInfo));

app.listen(port);