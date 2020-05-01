// from each url, create a dictionary object with its id, width, and length
const dimensionFunc = (url, grayscale) => {
	const splitUrl = url.split('/');
	if (grayscale === undefined) {
		url = url
	} else {
		url += grayscale
		console.log('url is: ' + url)
	}
	const dimensions = {
            url: url,
            id: splitUrl[splitUrl.length-3],
		    width: splitUrl[splitUrl.length-2],
		    length: splitUrl[splitUrl.length-1]
	};
	return dimensions;
};

// returns a new dict object for the cvs based on the url
const filterJSON = (jsonObj, grayscale) => {
	let newCSVObj = [];
	for (let value in jsonObj) {
		let galleryPic = jsonObj[value];
		newCSVObj.push(dimensionFunc(galleryPic.url, grayscale));
	}
	return newCSVObj;
};


module.exports = {
    dimensionFunc,
    filterJSON
}