const server = require('express') ;
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = server();
app.use(cors());

app.get('/' , (req , res) => res.send('creating my local server'));

app.get('/weather' , (req , res) => res.send(weatherData.cityInfo));

app.listen(3001);