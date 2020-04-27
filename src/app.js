const express = require('express');
const path = require('path');
const async = require('async');
const csv = require('csvtojson');
const NodeCache = require('node-cache');

const PORT = process.env.PORT || 3000
const myCache = new NodeCache();
const app = express();


// csv file contains 300x200, 100x100, 250x250, 400x200, 300x300
const csvFilePath = path.join(__dirname, './photos.csv');
const hourTime = 60 * 60 // seconds * minutes
let jsonCSV;
let newCSVObj;


app.get('/images', async function (req, res) {
    console.log('Sending request to fetch images from file')
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
                    info: { id: '160', width: '300', length: '300' }
                }] 
            */

            jsonCSV = jsonObj;
            //console.log(jsonCSV);
            return jsonCSV;
        }).then((jsoncsv) => {
            newCSVObj = filterJSON(jsoncsv);
            console.log(typeof(newCSVObj))

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
    res.send(data);
})

// from each url, create a dictionary object with its id, width, and length
const dimensionFunc = (url) => {
	const splitUrl = url.split('/');
	const dimensions = {
            url: url,
            id: splitUrl[splitUrl.length-3],
		    width: splitUrl[splitUrl.length-2],
		    length: splitUrl[splitUrl.length-1]
	};
	//console.log(dimensions);
	return dimensions;
};

// returns a new dict object for the cvs based on the url
const filterJSON = (jsonObj) => {
	let newCSVObj = [];
	for (let value in jsonObj) {
		let galleryPic = jsonObj[value];
		newCSVObj.push(dimensionFunc(galleryPic.url));
	}
	return newCSVObj;
};

app.listen(PORT, () => {
	console.log('App is running on port: ' + PORT);
});


