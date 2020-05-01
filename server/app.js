

const express = require('express');
const fs = require('fs');
const path = require('path');
const async = require('async');
const csv = require('csvtojson');
const NodeCache = require('node-cache');
const cors = require('cors')

// Server, caching and port info
const helperFunc = require('./helper-funcs'); // used for data async fetch
const PORT = process.env.PORT || 3001
const myCache = new NodeCache();
const app = express();

// Has token info regarding signing and verifying
const tokenHelper = require('./token-func.js');


// csv file contains 300x200, 100x100, 250x250, 400x200, 300x300
const csvFilePath = path.join(__dirname, './photos.csv');
const publicPath = path.join(__dirname, '../build')
const hourTime = 60 * 60 // seconds * minutes
let jsonCSV;
let newCSVObj;

// Enabling CORS headers for cross-domain requests
app.use(cors());

app.use(express.static(publicPath))

app.get('/verify', (req, res, next) => {
    console.log('req is: ' + req.query.email)

    // Generally you would check for email in a database but there is no db here 
    if (!req.query.email) {
        res.status(404).json({error: 'No email provided'})
    }
    
    let token = tokenHelper.sign({verified: true}, req.query.email)
    res.send(token);
})

app.post('/verify', (req, res, next) => {
    let email = req.body.email
})

app.post('/images', (req, res, next) => {
    const page = req.body.page
    const limit = req.body.limit
    const token = req.body.token
})


app.get('/images', async function (req, res) {
    console.log('Sending request to fetch images from file')

    const page = req.query.page
    const limit = req.query.limit
    const grayscale = req.query.hasOwnProperty("grayscale")
    const addGray = "?grayscale"    
    const token = req.query.token
    // console.log('token received: ' + token)

    let verifyToken = tokenHelper.verify(token);
    // console.log('verify token: ' + JSON.stringify(verifyToken))


    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let data = await csv()
        /*  If fetching from an url then this would switch to a stream and return a new promise.
            Then I can just pipe that readstream to put it to this route with my new dict obj
        */
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            /* 
            Converts the csv file to an array JSON object i.e. 
                [{
                    url: 'https://picsum.photos/id/160/300/300',
                    id: '160', 
                    width: '300', 
                    ength: '300' 
                }] 
            */

            jsonCSV = jsonObj;
            //console.log(jsonCSV);
            return jsonCSV;
        }).then((jsoncsv) => {

            if (grayscale == true) {
                newCSVObj = helperFunc.filterJSON(jsoncsv, addGray)
            } else {
                newCSVObj = helperFunc.filterJSON(jsoncsv);
            }

            // Stores the csv object in a set time hour cache
            let success = myCache.set(hourTime.toString(), newCSVObj, hourTime)
            let currentCache;

            // console.log('my cache is: ', myCache)
            // console.log('query width: ' + req.query.width)
            // console.log('query length: '+ req.query.length)

            if (success && req.query.width && req.query.length) {
                console.log('Using cache to filter based on query params: '+ success)
                currentCache = myCache.get(hourTime.toString())
                
                let filteredCache = currentCache.filter((picture) => {
                    return picture.width == req.query.width && picture.length == req.query.length
                })

                if (filteredCache.length < 1) {
                    console.log('No queries found based on filter')
                    res.status(404).json({'error': 'No picture queries found'})
                }
                return filteredCache
            } else if (success && !req.query.width && !req.query.length) {
                console.log('Returning cached results: ' + success)
                currentCache = myCache.get(hourTime.toString())
                return currentCache
            } else {
                res.status(404).json({'error': 'Error has occurred in fetching data'})
            }

        })
        .catch((err) => {
            console.log('error is: ', err);
            return Promise.reject(err);
        });

    if (page && limit) { 
        const paginatedResults = data.slice(startIndex, endIndex) 
        console.log('Fetching images from cache finished')
        res.send(paginatedResults)
    } else if(!verifyToken) { 
        res.status(404).json({'error': 'No user has been found'})
    } else {
        console.log('Fetching images from cache finished')
        res.send(data)
    }
})

app.listen(PORT, () => {
	console.log('App is running on port: ' + PORT);
});

