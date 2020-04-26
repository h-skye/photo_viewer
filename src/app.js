const express = require('express');
const path = require('path');
const async = require('async');
const app = express();


// csv file contains 300x200, 100x100, 250x250, 400x200, 300x300
const csvFilePath = path.join(__dirname, './photos.csv');
let jsonCSV;
let newCSVObj;
const csv=require('csvtojson');

app.get('/images', async function (req, res) {
    let data = await csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            // Converts the csv file to an array JSON object
            // i.e. [{url: 'urlimg1'}, {url: 'urlimg2'}], etc
            jsonCSV = jsonObj;
            //console.log(jsonCSV);
            return jsonCSV;
        }).then((jsoncsv) => {
            newCSVObj = filterJSON(jsoncsv);
            //console.log(newCSVObj);
            return newCSVObj;
        })
        .catch((err) => {
            console.log('error is: ', err);
            return Promise.reject(err);
        });
    
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


const filterJSON = (jsonObj) => {
	let newCSVObj = [];
	for (let value in jsonObj) {
		let galleryPic = jsonObj[value];
		newCSVObj.push(dimensionFunc(galleryPic.url));
	}
	return newCSVObj;
};

app.listen(3000, () => {
	console.log('App is running on port 3000');
});


