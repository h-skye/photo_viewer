// from each url, create a dictionary object with its id, width, and length
const dimensionFunc = (url) => {
	const splitUrl = url.split('/');
	const dimensions = {
            url: url,
            id: splitUrl[splitUrl.length-3],
		    width: splitUrl[splitUrl.length-2],
		    length: splitUrl[splitUrl.length-1]
	};
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


module.exports = {
    dimensionFunc,
    filterJSON
}