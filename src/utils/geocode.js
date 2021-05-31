const request = require('request')

const geocode = (address,callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWF2aW5hc2giLCJhIjoiY2twM3poZzdxMWY0bTMybXdmeGh1Nmo5YSJ9.gEZ5BKna-9s_Dfzaa0b5xQ&limit=1'

    request( {url: url ,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect location Services',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Search Again', undefined)
        }else{

            callback(undefined, {
               
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude:body.features[0].center[1]

            })
        }
    })
}

module.exports = geocode