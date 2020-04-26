const express = require('express');
const path = require('path');
const app = express();

const publicAssets = path.join(__dirname, '../public');
app.use(express.static(publicAssets));

app.listen(3000, () => {
	console.log('App is running on port 3000');
});

