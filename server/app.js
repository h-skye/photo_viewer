

const express = require('express');
const fs = require('fs');
const path = require('path');
const async = require('async');
const csv = require('csvtojson');
const NodeCache = require('node-cache');

const helperFunc = require('./helper-funcs');
const PORT = process.env.PORT || 3001
const myCache = new NodeCache();
const app = express();


// csv file contains 300x200, 100x100, 250x250, 400x200, 300x300
const csvFilePath = path.join(__dirname, './photos.csv');
const publicPath = path.join(__dirname, '../build')
console.log(publicPath)
const hourTime = 60 * 60 // seconds * minutes
let jsonCSV;
let newCSVObj;

// Enabling CORS headers for cross-domain requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.static(publicPath))

app.get('/images', async function (req, res) {
    console.log('Sending request to fetch images from file')
    const page = req.query.page
    const limit = req.query.limit
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
            newCSVObj = helperFunc.filterJSON(jsoncsv);

            // Stores the csv object in a set time hour cache
            let success = myCache.set(hourTime.toString(), newCSVObj, hourTime)
            let currentCache;

            console.log('my cache is: ', myCache)
            console.log('query width: ' + req.query.width)
            console.log('query length: '+ req.query.length)

            if (success && req.query.width && req.query.length) {
                console.log('Using cache to filter based on query params: '+ success)
                currentCache = myCache.get(hourTime.toString())
                
                return currentCache.filter((picture) => {
                    return picture.width == req.query.width && picture.length == req.query.length
                })
            } else if (success && !req.query.width && !req.query.length) {
                console.log('Returning cached results: ' + success)
                currentCache = myCache.get(hourTime.toString())
                return currentCache
            } else {
                console.log('Error: User provided incorrect query dimensions')
                throw new Error('Incorrect picture value dimensions')
            }

        })
        .catch((err) => {
            console.log('error is: ', err);
            return Promise.reject(err);
        });
    console.log('Fetching images from cache finished')
    
    if (page && limit) {
        const paginatedResults = data.slice(startIndex, endIndex) 
        console.log('Fetching images from cache finished')
        res.send(paginatedResults)
    } else {
        console.log('Fetching images from cache finished')
        res.send(data)
    }

    // res.send(data);
})

app.listen(PORT, () => {
	console.log('App is running on port: ' + PORT);
});

