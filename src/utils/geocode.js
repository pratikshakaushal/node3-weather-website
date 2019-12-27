const request=require('request')
const geocode =(address, callback) => {
const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoicHJhdGlrc2hha2F1c2hhbCIsImEiOiJjazRjcGplazkwcTFlM2ZvZ2pmcHJ0MzlqIn0.pzD-cwRNfuGj90kZEjYCJg'
    request({url, json:true}, (error,{body} ) => {
        if(error) {
            callback('unable to connect to location service',undefined)
        }
        else if (body.features.length=== 0) {
            callback('unable to find the location.Try another search',undefined)
        }
        else {
            callback(undefined,{
                latitude :body.features[0].center[0],
                longitude:body.features[0].center[1],
                location: body.features[0].place_name 

            })
        }

    })
}
module.exports= geocode