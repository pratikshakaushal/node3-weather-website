//js based server(use to interact with your application)
//to interact with your application instead of terminal you can visit url
//eg. made a portfolio in nodejs and show in browser which include html files,css,js etc
//we use express library
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//express is a function and we call it to create new application
const app=express()                        //take no arguments

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//set handlebar and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))        //use to customise your server

app.get('',(req, res) => {
    res.render('index',{
        title: 'weather App',
        name : 'Pratiksha Kaushal'
    })
})
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'weather App',
        name : 'Pratiksha Kaushal'

    })
})
app.get('/help',(req, res) => {
    res.render('Help',{
        name: 'Pratiksha Kaushal',
        title:'internet'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'YOu must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude, location} ={}) => {
        if( error) {
            return res.send( {error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send ({
            error : 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('4O4', {
        title :'4O4',
        name : 'Pratiksha Kaushal',
        errorMessage :'help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('4O4', {
        title: '4O4',
        name : 'Pratiksha Kaushal',
        errorMessage : 'page not found'
    })
})

app.listen(3000, ()=>{          //(port,callback)
    console.log('server is up on port 3000')
})
//template engine -> handlebars allow us to randor dynamic documents and easily to create code which can be reuse
// app.get('', (req, res) => {          // let us configure what server should do when someone try to get resource by specific url(tale route and function as a parameter)
//                              //function first parameter contain objet having info of incoming request to the server (req) and other is response (res)
//     res.send('<h1>EXPRESS</h1>')     //allow us to send something to requester            
// }) 
