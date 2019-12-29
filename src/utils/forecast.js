const request =require('request')
const forecast=(longitude,latitude,callback) => {
    const url ='https://api.darksky.net/forecast/c163f5b673c94338327005d65e31f76b/' + latitude + ',' + longitude
    request({url, json :true}, (error,{body}) => {
        if (error) {
            callback('unable to connect to weather service',undefined)

        }
        else if (body.error) {
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary +'here temperature is : ' + body.currently.temperature + ' The high today is '+ body.daily.data[0].temperatureHigh + 'with a low of'+ body.daily.data[0].temperatureLow + ' there is a ' + body.currently.precipProbability + '% chances of rain')
        }
    })


}

module.exports=forecast