const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')
const { error } = require('console')




const app = express()

//Path for Express config
const dir_path = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../Template/views')
const partialsPath = path.join(__dirname,'../Template/partials')

//Setting up handlebar config
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(dir_path))

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title: 'Weather App',
        name: 'Avinash Anand',
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Avinash Anand'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Avinash Anand',
        msg: 'This is a message for help...'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'Must provide an address'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Must require a search term'
        })
    }

    res.send({
        products: []    
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'Error Page',
        name:'Avinash Anand',
        er: 'Error 404',
        ermsg: 'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'Error Page',
        name:'Avinash Anand',
        er:'Error 404',
        ermsg:'Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})