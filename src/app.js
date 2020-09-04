const path = require('path');
const express = require('express'); // just a single function
const hbs = require("hbs");
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//console.log(__dirname); // path to the directory this file is
//console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 4200;

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectory));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vlad'
    }) //render render a view
});

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help page",
        name: "Vlad"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: 'Vlad'
    });
});

app.get('/weather', (req, res) => {
    var lat, long, data;
    if(!req.query.address){
        return res.send({
            error: 'Please provide an adress'
        });
    }
    else{
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location,
                forecast: forecastData 
            });
        })
    });

   
    } 
});

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// });

app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: "This help article doesn't exist",
        title: 'Not found',
        name: 'Vlad'
    })
});

app.get('*', (req, res) => {
    res.render('404page', {
        message: 'This page dont exist',
        title: 'Not found',
        name: 'Vlad'
    });
})

app.listen(port, () => {
    console.log("Server stared on " + port);
}) // listen start the server, 3000 -> port running

