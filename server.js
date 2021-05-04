require('dotenv').config()
const server = require('express') ;
const cors = require('cors');

const weatherData = require('./data/weather.json');

const app = server();
app.use(cors());
const port = process.env.PORT ;


app.get('/' , (req , res) => res.send(`creating my local server port`));  //test
 

app.get('/weather/:query/:lat/:lot' , (req , res) => {
    const query = req.params.query.toLowerCase() ;
    const lat = req.params.lat ;
    const lot = req.params.lot ;
    
    let check = weatherData.cityInfo.find((value,index) => (value.city_name.toLowerCase()==query) && (value.lat == lat) && (value.lot==lot) );
    if(check)
        res.send(`Location: ${check.city_name}, latitude: ${check.lat}, longitude: ${check.lot}, wind direction: ${check.wind_dir}, temperature: ${check.temp}, date: ${check.datetime}`);
    else
        res.send('error not found the city');
    
});


app.listen(port);


