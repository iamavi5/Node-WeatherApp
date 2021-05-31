const request = require('request')

const forecast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3c45fce81b3c3337942828d4778fc0d2&query='+lat+','+lon

    request({url:url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect weather app!',undefined)
        }else if(body.error){  
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,body.current.weather_descriptions +".\nThe temperature is "+body.current.temperature+'C. The chance of rain is '+body.current.precip+'%.')

            
        }
    })

}
module.exports = forecast