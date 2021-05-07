const superagent = require('superagent');
require('dotenv').config();
let cacheMemory = require('./cache');




const getWeather = (req , res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
    const key = `weather-${req.query.lat}${req.query.lon}`;
    const queryParams={
        key:process.env.WEATHER_API_KEY ,
        lat:req.query.lat,
        lon:req.query.lon,
        lang:'en',
        days:5
    }
    if(cacheMemory[key])
    {
        res.send(cacheMemory[key]);
        console.log('sent data from the cache memory');
    }
    else{
    superagent.get(url).query(queryParams).then( data1 => { 
    const data = data1.body.data.map( data => new Weather(data));
    cacheMemory[key]=data ; 
    res.send(data);
    console.log('sent data from the api ');
    }

    ).catch (error => {
        res.send(error);
    });   
}
};


class Weather {
    constructor(data){
        this.date = data.valid_date;
        this.description = `Low of ${data.low_temp} , High of ${data.max_temp} with ${data.weather.description}`;
    }
}


module.exports = getWeather ;

