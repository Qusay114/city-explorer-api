require('dotenv').config()
const server = require('express') ;
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = server();
app.use(cors());
const port = process.env.PORT ;


app.get('/weather' , (req , res) => {
    const data = weatherData.data.map( data => new Weather(data));
    res.send(data);
});

class Weather {
    constructor(data){
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

app.listen(port);


