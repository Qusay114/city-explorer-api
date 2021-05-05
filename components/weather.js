const superagent = require('superagent');
require('dotenv').config();




const getWeather = (req , res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(url).then( data1 => { 
    const data = data1.body.data.map( data => new Weather(data));
    res.send(data);

})}


class Weather {
    constructor(data){
        this.date = data.valid_date;
        this.description = `Low of ${data.low_temp} , High of ${data.max_temp} with ${data.weather.description}`;
    }
}


module.exports = getWeather ;

