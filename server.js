// dependencies
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// use created routes
require('./routes/routes')(app);

// api listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});